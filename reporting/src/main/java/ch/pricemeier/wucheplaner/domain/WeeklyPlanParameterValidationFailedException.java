package ch.pricemeier.wucheplaner.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public final class WeeklyPlanParameterValidationFailedException extends RuntimeException {
    private static final long serialVersionUID = -6812099937272938645L;
    private final List<ValidationResult> results;
}
