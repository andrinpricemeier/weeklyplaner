package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@AllArgsConstructor
public final class WeekFromTo {
    private final String weekFrom;
    private final String weekTo;

    public void generate(final XWPFDocument document) {
        XWPFParagraph weekFromToParagraph = document.createParagraph();
        XWPFRun weekFromToRun = weekFromToParagraph.createRun();
        weekFromToRun.setText(String.format("Woche von %s bis %s", weekFrom, weekTo));
        weekFromToRun.setFontSize(16);
    }

    public List<ValidationResult> validate() {
        final List<ValidationResult> results = new ArrayList<>();
        try {
            LocalDate.parse(weekFrom);
            results.add(new ValidationResult("weekFrom", "", true));
        } catch (DateTimeParseException ex) {
            results.add(new ValidationResult("weekFrom", "Kein Wochenstartdatum angegeben.", false));
        }
        try {
            LocalDate.parse(weekTo);
            results.add(new ValidationResult("weekTo", "", true));
        } catch (DateTimeParseException ex) {
            results.add(new ValidationResult("weekTo", "Kein Wochenenddatum angegeben.", false));
        }
        return Collections.unmodifiableList(results);
    }
}