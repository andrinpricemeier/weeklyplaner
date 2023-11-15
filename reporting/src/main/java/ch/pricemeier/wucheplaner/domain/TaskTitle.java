package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;

@AllArgsConstructor
public final class TaskTitle {
    private final String title;

    public void generate(XWPFTableCell cell) {
        XWPFParagraph titleParagraph = cell.getParagraphs().get(0);
        XWPFRun titleRun = titleParagraph.createRun();
        titleRun.setText(title);
        titleRun.setFontSize(16);
        titleRun.setBold(true);
    }

    public ValidationResult validate() {
        if (title == null || title.isBlank()) {
            return new ValidationResult("title", "Ungültigen Titel angegeben.", false);
        }
        return new ValidationResult("title", "", true);
    }
}
