package ch.pricemeier.wucheplaner.api;

import ch.pricemeier.wucheplaner.domain.*;
import com.google.protobuf.ByteString;
import io.quarkus.grpc.GrpcService;
import io.smallrye.mutiny.Uni;
import lombok.AllArgsConstructor;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import io.quarkus.logging.Log;

@GrpcService
@AllArgsConstructor
public final class WeeklyPlanerService implements WeeklyPlaner {

    @Override
    public Uni<WeeklyPlanReply> createWeeklyPlan(WeeklyPlanRequest request) {
        Log.info("Received request.");
        Log.info(request);
        try {
            return create(request);
        } catch (WeeklyPlanParameterValidationFailedException e) {
            Log.error("Parameter validation failed", e);
            return failWithValidationErrors(e);
        } catch (WeeklyPlanCreationFailedException e) {
            Log.error("Plan creation failed", e);
            return failWithPlanCreationFailed();
        } catch (Exception e) {
            Log.error("Unexpected error", e);
            return failWithUnexpectedFailure();
        }
    }

    private Uni<WeeklyPlanReply> failWithPlanCreationFailed() {
        return Uni.createFrom().item(() ->
                WeeklyPlanReply.newBuilder()
                        .setReportUid(UUID.randomUUID().toString())
                        .setReport(ByteString.EMPTY)
                        .setError(createErrorInformation(new ArrayList<>(), "Irgendetwas ist beim Wochenplan erstellen schief gelaufen. Bitte kontaktieren Sie den Entwickler.")).build());
    }

    private Uni<WeeklyPlanReply> failWithUnexpectedFailure() {
        return Uni.createFrom().item(() ->
                WeeklyPlanReply.newBuilder()
                        .setReportUid(UUID.randomUUID().toString())
                        .setReport(ByteString.EMPTY)
                        .setError(createErrorInformation(new ArrayList<>(), "Irgendetwas Unerwartetes ist beim Wochenplan erstellen schief gelaufen. Bitte kontaktieren Sie den Entwickler.")).build());
    }

    private Uni<WeeklyPlanReply> failWithValidationErrors(WeeklyPlanParameterValidationFailedException e) {
        return Uni.createFrom().item(() ->
                WeeklyPlanReply.newBuilder()
                        .setReportUid(UUID.randomUUID().toString())
                        .setReport(ByteString.EMPTY)
                        .setError(createErrorInformation(e.getResults(), "")).build());
    }

    private static Uni<WeeklyPlanReply> create(WeeklyPlanRequest request) {
        final WeeklyPlan plan = new WeeklyPlan();
        final List<Task> tasks = request
                .getTasksList()
                .stream()
                .map(msg -> new Task(msg.getSubject(), msg.getImageName(), msg.getTitle(), msg.getDescription())).toList();
        final byte[] planInWordFormat = plan.create("Wochenplan", request.getWeekFrom(), request.getWeekTo(), request.getSchoolClasses(), tasks);
        return Uni.createFrom().item(() ->
                WeeklyPlanReply.newBuilder()
                        .setReportUid(UUID.randomUUID().toString())
                        .setReport(ByteString.copyFrom(planInWordFormat))
                        .setError(ErrorInformation.newBuilder().setHasErrors(false).build()).build()
        );
    }

    private ErrorInformation createErrorInformation(final List<ValidationResult> results, final String generalError) {
        String weekFrom = "";
        String weekTo = "";
        String schoolClasses = "";
        final StringBuilder tasks = new StringBuilder();
        for (final ValidationResult result : results) {
            if (result.fieldName().equals("weekFrom")) {
                weekFrom = result.reason();
            } else if (result.fieldName().equals("weekTo")) {
                weekTo = result.reason();
            } else if (result.fieldName().equals("schoolClasses")) {
                schoolClasses = result.reason();
            } else {
                tasks.append(String.format("%s%n", result.reason()));
            }
        }
        return ErrorInformation.newBuilder()
                .setWeekFrom(weekFrom)
                .setWeekTo(weekTo)
                .setSchoolClasses(schoolClasses)
                .setTasks(tasks.toString())
                .setGeneralError(generalError)
                .setHasErrors(true).build();
    }
}