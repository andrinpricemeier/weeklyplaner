package ch.pricemeier.wucheplaner.domain;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;

public final class PupilNamePlaceholder {
    public void generate(final XWPFDocument document) {
        XWPFParagraph namePlaceholderParagraph = document.createParagraph();
        XWPFRun namePlaceholderRun = namePlaceholderParagraph.createRun();
        namePlaceholderRun.setText("Name: ___________________________");
        namePlaceholderRun.setFontSize(16);
        document.createParagraph();
        document.createParagraph();
    }
}