package com.swk.sr.ui.service;

import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.model.SchemaTypeDTO;
import io.confluent.kafka.schemaregistry.json.JsonSchema;
import org.springframework.stereotype.Service;

@Service
public class JSONCompatibilityService extends AbstractCompatibilityService<JsonSchema> {
  @Override
  public SchemaTypeDTO getType() {
    return SchemaTypeDTO.JSON;
  }

  @Override
  public JsonSchema parseSchema(String schema) throws SchemaParserError {
    try {
      return new JsonSchema(schema);
    } catch (IllegalArgumentException e) {
      throw new SchemaParserError("Invalid schema", e);
    }
  }
}
