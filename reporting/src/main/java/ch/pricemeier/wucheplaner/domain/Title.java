package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;

@AllArgsConstructor
public final class Title {
    private final String planTitle;
    public void generate(final XWPFDocument document) {
        XWPFParagraph paragraphTitle = document.createParagraph();
        XWPFRun titleRun = paragraphTitle.createRun();
        titleRun.setText(this.planTitle);
        titleRun.setBold(true);
        titleRun.setFontSize(48);
        document.createParagraph();
        document.createParagraph();
    }
}
