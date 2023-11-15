package ch.pricemeier.wucheplaner.domain;

public record ValidationResult(String fieldName, String reason, boolean success) {}
