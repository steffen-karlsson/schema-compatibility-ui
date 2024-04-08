package com.swk.sr.ui.service;

import com.swk.sr.ui.error.SchemaCompareError;
import com.swk.sr.ui.model.SchemaCompatibilityResponseDTO;
import com.swk.sr.ui.model.SchemaCompatibilitySubjectDTO;
import org.springframework.stereotype.Service;

@Service
public class JSONCompatibilityService implements CompatibilityService {
  @Override
  public SchemaCompatibilityResponseDTO compareSchemas(SchemaCompatibilitySubjectDTO schemaCompatibilitySubjectDTO)
      throws SchemaCompareError {
    return null;
  }
}
