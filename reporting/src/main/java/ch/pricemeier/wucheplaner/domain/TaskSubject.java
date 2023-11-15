package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;

@AllArgsConstructor
public final class TaskSubject {
    private final String subject;

    public void generate(XWPFTableCell cell) {
        cell.setVerticalAlignment(XWPFTableCell.XWPFVertAlign.CENTER);
        XWPFParagraph subjectParagraph = cell.getParagraphs().get(0);
        subjectParagraph.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun subjectRun = subjectParagraph.createRun();
        subjectRun.setText(subject);
        subjectRun.setFontSize(16);
    }

    public ValidationResult validate() {
        if (subject == null || subject.isBlank()) {
            return new ValidationResult("subject", "Ungültiges Fach angegeben.", false);
        }
        return new ValidationResult("subject", "", true);
    }
}
