package com.swk.sr.ui.service;

import com.swk.sr.ui.error.SchemaCompareError;
import com.swk.sr.ui.model.SchemaCompatibilityResponseDTO;
import com.swk.sr.ui.model.SchemaCompatibilitySubjectDTO;

public interface CompatibilityService {

  SchemaCompatibilityResponseDTO compareSchemas(SchemaCompatibilitySubjectDTO schemaCompatibilitySubjectDTO) throws
      SchemaCompareError;
}
