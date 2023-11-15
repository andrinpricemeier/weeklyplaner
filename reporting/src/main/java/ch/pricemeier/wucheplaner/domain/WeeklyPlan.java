package ch.pricemeier.wucheplaner.domain;

import org.apache.poi.xwpf.usermodel.XWPFDocument;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public final class WeeklyPlan {
    public byte[] create(final String title, final String weekFrom, final String weekTo, final String schoolClasses, List<Task> tasks) {
        validateParameter(weekFrom, weekTo, schoolClasses, tasks);
        try (final XWPFDocument document = new XWPFDocument()) {
            return createReport(title, weekFrom, weekTo, schoolClasses, tasks, document);
        } catch (IOException e) {
            throw new WeeklyPlanCreationFailedException(e);
        }
    }

    private byte[] createReport(final String title, final String weekFrom, final String weekTo, final String schoolClasses, List<Task> tasks, final XWPFDocument document) {
        new Title(title).generate(document);
        new WeekFromTo(weekFrom, weekTo).generate(document);
        new SchoolClasses(schoolClasses).generate(document);
        new PupilNamePlaceholder().generate(document);
        new TaskList(tasks).generate(document);
        return toByteArray(document);
    }

    private byte[] toByteArray(final XWPFDocument document) {
        try (final ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            document.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new WeeklyPlanCreationFailedException(e);
        }
    }

    private void validateParameter(final String weekFrom, final String weekTo, final String schoolClasses, List<Task> tasks) {
        final List<ValidationResult> results = new ArrayList<>();
        results.addAll(new WeekFromTo(weekFrom, weekTo).validate());
        results.add(new SchoolClasses(schoolClasses).validate());
        results.addAll(new TaskList(tasks).validate());
        if (results.stream().anyMatch(result -> !result.success())) {
            final var failedOnly = results.stream().filter(result -> !result.success()).toList();
            throw new WeeklyPlanParameterValidationFailedException(failedOnly);
        }
    }
}
