package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;

@AllArgsConstructor
public final class SchoolClasses {
    private final String schoolClassText;

    public void generate(final XWPFDocument document) {
        XWPFParagraph paragraph = document.createParagraph();
        XWPFRun run = paragraph.createRun();
        run.setText(String.format("Klassen: %s", schoolClassText));
        run.setFontSize(16);
        document.createParagraph();
        document.createParagraph();
        document.createParagraph();
        document.createParagraph();
        document.createParagraph();
    }

    public ValidationResult validate() {
        if (schoolClassText == null || schoolClassText.isBlank()) {
            return new ValidationResult("schoolClasses", "Keine Schulklassen angegeben.", false);
        }
        return new ValidationResult("schoolClasses", "", true);
    }
}