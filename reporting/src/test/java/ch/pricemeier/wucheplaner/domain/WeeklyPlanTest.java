package ch.pricemeier.wucheplaner.domain;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

class WeeklyPlanTest {
    @Test
    void create_report_title_is_correct() {
        final var plan = new WeeklyPlan();
        final var createdPlan = plan.create(
                "Wochenplan",
                LocalDate.now().toString(),
                LocalDate.now().toString(),
                "5. und 6. Klassen",
                new ArrayList<>());
        WordDocumentAssertion
                .withDocument(createdPlan)
                .assertContainsText("Wochenplan");
    }

    @Test
    void create_report_week_date_range_is_correct() {
        final var plan = new WeeklyPlan();
        final var expectedWeekFrom = LocalDate.now().toString();
        final var expectedWeekTo = LocalDate.now().plus(1, ChronoUnit.WEEKS).toString();
        final var createdPlan = plan.create("Wochenplan", expectedWeekFrom, expectedWeekTo, "5. und 6. Klassen",
                new ArrayList<>());
        WordDocumentAssertion
                .withDocument(createdPlan)
                .assertContainsText(expectedWeekFrom.toString())
                .assertContainsText(expectedWeekTo.toString());
    }

    @Test
    void create_report_school_classes_is_correct() {
        final var plan = new WeeklyPlan();
        final var createdPlan = plan.create("Wochenplan", LocalDate.now().toString(), LocalDate.now().toString(), "5. und 6. Klassen",
                new ArrayList<>());
        WordDocumentAssertion
                .withDocument(createdPlan)
                .assertContainsText("Wochenplan");
    }

    @Test
    void create_report_has_field_for_pupils_name() {
        final var plan = new WeeklyPlan();
        final var createdPlan = plan.create("Wochenplan", LocalDate.now().toString(), LocalDate.now().toString(), "5. und 6. Klassen",
                new ArrayList<>());
        WordDocumentAssertion
                .withDocument(createdPlan)
                .assertContainsText("Name:");
    }
}
