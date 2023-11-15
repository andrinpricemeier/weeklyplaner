package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;

@AllArgsConstructor
public final class WordDocumentAssertion {
    private final XWPFDocument document;

    static WordDocumentAssertion withDocument(final byte[] documentBytes) {
        try {
            return new WordDocumentAssertion(new XWPFDocument(new ByteArrayInputStream(documentBytes)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    WordDocumentAssertion assertContainsText(final String text) {
        assertThat(document.getParagraphs().stream().anyMatch(p -> p.getText().contains(text))).isTrue();
        return this;
    }
}
