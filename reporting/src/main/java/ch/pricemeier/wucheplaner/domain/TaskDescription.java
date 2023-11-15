package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;

@AllArgsConstructor
public final class TaskDescription {
    private final String description;

    public void generate(XWPFTableCell cell) {
        XWPFParagraph taskDescriptionParagraph = cell.getParagraphs().get(0);
        final String[] textLines = description.split("\n");
        for (int i = 0; i < textLines.length; i++) {
            XWPFRun taskDescriptionRun = taskDescriptionParagraph.createRun();
            taskDescriptionRun.setText(textLines[i]);
            taskDescriptionRun.setFontSize(16);
            if (i < textLines.length - 1) {
                taskDescriptionRun.addBreak();
            }
        }
    }

    public ValidationResult validate() {
        if (description == null || description.isBlank()) {
            return new ValidationResult("description", "Keine Beschreibung angegeben.", false);
        }
        return new ValidationResult("description", "", true);
    }
}
