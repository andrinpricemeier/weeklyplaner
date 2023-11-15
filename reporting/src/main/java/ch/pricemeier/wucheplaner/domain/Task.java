package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public final class Task {
    private final String subject;
    private final String imageName;
    private final String title;
    private final String description;

    public void generate(final XWPFTableRow firstRow, final XWPFTableRow secondRow, final XWPFTableRow thirdRow) {
        new TaskImage(imageName).generate(firstRow.getCell(0));
        new TaskSubject(subject).generate(firstRow.getCell(1));
        new TaskTitle(title).generate(secondRow.getCell(0));
        new TaskDescription(description).generate(thirdRow.getCell(0));
        new TaskCheckbox().generate(firstRow.getCell(2));
    }

    public List<ValidationResult> validate() {
        final List<ValidationResult> results = new ArrayList<>();
        results.add(new TaskSubject(subject).validate());
        results.add(new TaskImage(imageName).validate());
        results.add(new TaskTitle(title).validate());
        results.add(new TaskDescription(description).validate());
        return results;
    }
}
