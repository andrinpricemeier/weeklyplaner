package ch.pricemeier.wucheplaner.api;

import java.time.Duration;
import io.quarkus.grpc.GrpcClient;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@QuarkusTest
class WeeklyPlanerServiceTest {

    @GrpcClient
    WeeklyPlaner service;

    @Test
    void create_weekly_plan_works() {
        final WeeklyPlanReply reply = service
                .createWeeklyPlan(
                        WeeklyPlanRequest.newBuilder().setWeekFrom("2022-01-01").setWeekTo("2022-01-07").build())
                        .await().atMost(Duration.ofSeconds(5));
        assertThat(reply.getReport()).isNotNull();
    }

}
