package com.swk.sr.ui.service;

import com.swk.sr.ui.error.SchemaCompareError;
import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.model.CompatibilityLevelDTO;
import com.swk.sr.ui.model.SchemaCompatibilitySubjectDTO;
import io.confluent.kafka.schemaregistry.CompatibilityChecker;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public abstract class AbstractCompatibilityService<T extends ParsedSchema> implements CompatibilityService<T> {

  private static final Map<CompatibilityLevelDTO, CompatibilityChecker> COMPATIBILITY_CHECKERS = Map.of(
      CompatibilityLevelDTO.BACKWARD, CompatibilityChecker.BACKWARD_CHECKER,
      CompatibilityLevelDTO.FORWARD, CompatibilityChecker.FORWARD_CHECKER,
      CompatibilityLevelDTO.FULL, CompatibilityChecker.FULL_CHECKER
  );

  public SchemaCompatibilityResult compareSchemas(SchemaCompatibilitySubjectDTO schemaCompatibilitySubjectDTO)
      throws SchemaCompareError, SchemaParserError {
    T existing;
    T proposed;

    try {
      existing = parseSchema(schemaCompatibilitySubjectDTO.getExistingSchema());
    } catch (SchemaParserError e) {
      throw new SchemaCompareError(String.format("Invalid existing schema: %s", e.getMessage()), e);
    }

    try {
      proposed = parseSchema(schemaCompatibilitySubjectDTO.getProposedSchema());
    } catch (SchemaParserError e) {
      throw new SchemaCompareError(String.format("Invalid proposed schema: %s", e.getMessage()), e);
    }

    CompatibilityLevelDTO compatibilityLevel = schemaCompatibilitySubjectDTO.getCompatibilityLevel();
    if (!COMPATIBILITY_CHECKERS.containsKey(compatibilityLevel)) {
      throw new IllegalArgumentException(compatibilityLevel + " compatibility level is not supported");
    }

    CompatibilityChecker checker = COMPATIBILITY_CHECKERS.get(compatibilityLevel);
    List<String> validationErrors = checker.isCompatible(proposed, Collections.singletonList(existing));
    List<String> jsonValidationErrors = validationErrors
        .stream()
        .map(this::parseValidationErrors)
        .toList();
    if (validationErrors.isEmpty()) {
      return new SchemaCompatibilityResult(true, Collections.emptyList());
    } else {
      return new SchemaCompatibilityResult(false, jsonValidationErrors);
    }
  }

  public record SchemaCompatibilityResult(boolean isCompatible, List<String> errors) {
  }
}
