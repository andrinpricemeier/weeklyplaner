package ch.pricemeier.wucheplaner.domain;

public final class WeeklyPlanCreationFailedException extends RuntimeException {
    private static final long serialVersionUID = -7971175316170674741L;
    public WeeklyPlanCreationFailedException(final Throwable cause) {
        super(cause);
    }
}
