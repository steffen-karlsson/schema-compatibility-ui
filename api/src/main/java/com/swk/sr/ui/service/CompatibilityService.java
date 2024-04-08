package com.swk.sr.ui.service;

import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.model.SchemaTypeDTO;
import io.confluent.kafka.schemaregistry.ParsedSchema;

public interface CompatibilityService<T extends ParsedSchema> {
  SchemaTypeDTO getType();

  T parseSchema(String schema) throws SchemaParserError;
}
