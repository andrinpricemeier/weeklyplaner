package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public final class TaskList {
    private final List<Task> tasks;

    public void generate(final XWPFDocument document) {
        XWPFTable table = document.createTable();
        table.setWidthType(TableWidthType.PCT);
        table.setWidth("100%");
        final var firstRow = table.getRow(0);
        firstRow.addNewTableCell();
        firstRow.addNewTableCell();
        createTaskStructure(firstRow, table);
        for (int i = 0; i < tasks.size() - 1; i++) {            ;
            createTaskStructure(table.createRow(), table);
        }
        int rowOffset = 0;
        for (int i = 0; i < tasks.size(); i++) {
            final int startRowIndex = rowOffset * 3;
            tasks.get(i).generate(table.getRow(startRowIndex), table.getRow(startRowIndex + 1), table.getRow(startRowIndex + 2));
            rowOffset++;
        }
    }

    private void createTaskStructure(final XWPFTableRow firstRow, final XWPFTable table) {
        final var secondRow = table.createRow();
        secondRow.getCell(0).getCTTc().addNewTcPr().addNewHMerge().setVal(STMerge.RESTART);
        secondRow.getCell(1).getCTTc().addNewTcPr().addNewHMerge().setVal(STMerge.CONTINUE);
        final var thirdRow = table.createRow();
        thirdRow.getCell(0).getCTTc().addNewTcPr().addNewHMerge().setVal(STMerge.RESTART);
        thirdRow.getCell(1).getCTTc().addNewTcPr().addNewHMerge().setVal(STMerge.CONTINUE);
        firstRow.getCell(2).getCTTc().addNewTcPr().addNewVMerge().setVal(STMerge.RESTART);
        secondRow.getCell(2).getCTTc().addNewTcPr().addNewVMerge().setVal(STMerge.CONTINUE);
        thirdRow.getCell(2).getCTTc().addNewTcPr().addNewVMerge().setVal(STMerge.CONTINUE);
    }

    public List<ValidationResult> validate() {
        final List<ValidationResult> results = new ArrayList<>();
        for (final Task task : tasks) {
            results.addAll(task.validate());
        }
        return results;
    }
}
