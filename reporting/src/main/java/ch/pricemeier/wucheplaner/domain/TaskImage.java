package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.util.Units;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;
import io.quarkus.logging.Log;

import static org.apache.poi.xwpf.usermodel.Document.PICTURE_TYPE_PNG;

@AllArgsConstructor
public final class TaskImage {
    private final String imageName;

    public void generate(XWPFTableCell cell) {
        XWPFParagraph imageParagraph = cell.getParagraphs().get(0);
        XWPFRun imageRun = imageParagraph.createRun();
        imageRun.setTextPosition(20);
        Path imagePath = null;
        try {
            imagePath = getImagePath();
        } catch (Exception e) {
            throw new WeeklyPlanCreationFailedException(e);
        }
        try {
            imageRun.addPicture(Files.newInputStream(imagePath),
                    PICTURE_TYPE_PNG, imagePath.getFileName().toString(),
                    Units.toEMU(50), Units.toEMU(50));
        } catch (InvalidFormatException | IOException e) {
            throw new WeeklyPlanCreationFailedException(e);
        }
    }

    public ValidationResult validate() {
        try {
            getImagePath();
        } catch (Exception e) {
            return new ValidationResult("imageName", "Ungültiges Bild übergeben.", false);
        }
        return new ValidationResult("imageName", "", true);
    }

    private Path getImagePath() {
        try {
            return Paths.get(Thread.currentThread().getContextClassLoader().getResource(getImageName()).toURI());
        } catch (Exception e) {
            Log.error(e);
            try {
                return Paths.get(getFromFileSystem());
            } catch (Exception e2) {
                Log.error(e2);
                throw new RuntimeException(e2);
            }
        }
    }

    private String getImageName() {
        final String path = String.format("/META-INF/resources/subjects/%s", imageName.toLowerCase(Locale.ROOT));
        Log.info(path);
        return path;
    }

    private String getFromFileSystem() {
        return String.format("/deployments/subjects/%s", imageName.toLowerCase(Locale.ROOT));
    }
}
