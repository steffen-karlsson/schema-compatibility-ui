package com.swk.sr.ui.service;

import com.swk.sr.ui.error.SchemaCompareError;
import com.swk.sr.ui.model.CompatibilityLevelDTO;
import com.swk.sr.ui.model.SchemaCompatibilityResponseDTO;
import com.swk.sr.ui.model.SchemaCompatibilitySubjectDTO;
import com.swk.sr.ui.utils.SchemaUtils;
import org.apache.avro.Schema;
import org.apache.avro.SchemaCompatibility;
import org.apache.avro.SchemaParseException;
import org.springframework.stereotype.Service;

@Service
public class AvroCompatibilityService implements CompatibilityService {

  @Override
  public SchemaCompatibilityResponseDTO compareSchemas(SchemaCompatibilitySubjectDTO schemaCompatibilitySubjectDTO)
      throws SchemaCompareError {
    Schema existing;
    Schema proposed;

    try {
      existing = SchemaUtils.toSchema(schemaCompatibilitySubjectDTO.getExistingSchema());
    } catch (SchemaParseException e) {
      throw new SchemaCompareError("Invalid existing schema", e);
    }

    try {
      proposed = SchemaUtils.toSchema(schemaCompatibilitySubjectDTO.getProposedSchema());
    } catch (SchemaParseException e) {
      throw new SchemaCompareError("Invalid proposed schema", e);
    }

    SchemaCompatibilityResult isCompatible =
        isCompatible(existing, proposed, schemaCompatibilitySubjectDTO.getCompatibilityLevel());
    return new SchemaCompatibilityResponseDTO(isCompatible.isCompatible(), isCompatible.message());
  }

  private SchemaCompatibilityResult isCompatible(Schema existing, Schema proposed,
                                                 CompatibilityLevelDTO compatibilityLevel) {
    SchemaCompatibility.SchemaPairCompatibility canRead =
        SchemaCompatibility.checkReaderWriterCompatibility(existing, proposed);
    SchemaCompatibility.SchemaPairCompatibility canWrite =
        SchemaCompatibility.checkReaderWriterCompatibility(proposed, existing);

    switch (compatibilityLevel) {
      case BACKWARD -> {
        // Can read the data written by the most recent previous schema.
        return new SchemaCompatibilityResult(
            canRead.getType() == SchemaCompatibility.SchemaCompatibilityType.COMPATIBLE,
            canRead.getDescription());
      }
      case BACKWARD_TRANSITIVE -> {
        // Can read the data written by all earlier schemas.
        throw new UnsupportedOperationException();
      }
      case FORWARD -> {
        // The data written by this schema can be read by the most recent previous schema
        return new SchemaCompatibilityResult(
            canWrite.getType() == SchemaCompatibility.SchemaCompatibilityType.COMPATIBLE,
            canWrite.getDescription());
      }
      case FORWARD_TRANSITIVE -> {
        // The data written by this schema can be read by all earlier schemas.
        throw new UnsupportedOperationException();
      }
      case FULL -> {
        // Can read the data written by, a write data readable by the most recent previous schema.
        boolean isCompatibleRead = canRead.getType() == SchemaCompatibility.SchemaCompatibilityType.COMPATIBLE;
        boolean isCompatibleWrite = canWrite.getType() == SchemaCompatibility.SchemaCompatibilityType.COMPATIBLE;
        return new SchemaCompatibilityResult(isCompatibleRead && isCompatibleWrite,
            "Can read: " + canRead.getDescription() + "\nCan Write: " + canWrite.getDescription());
      }
      case FULL_TRANSITIVE -> {
        // Can read the data written by, a write data readable by all earlier schemas.
        throw new UnsupportedOperationException();
      }
      default -> {
        // Intentionally fall through
      }
    }

    throw new IllegalArgumentException(compatibilityLevel + " compatibility level is not supported");
  }

  record SchemaCompatibilityResult(boolean isCompatible, String message) {
  }
}
