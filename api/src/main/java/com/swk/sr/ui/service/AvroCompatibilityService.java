package com.swk.sr.ui.service;

import blue.endless.jankson.api.SyntaxError;
import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.model.SchemaTypeDTO;
import com.swk.sr.ui.utils.Json5Parser;
import io.confluent.kafka.schemaregistry.avro.AvroSchema;
import org.apache.avro.SchemaParseException;
import org.springframework.stereotype.Service;

@Service
public class AvroCompatibilityService extends AbstractCompatibilityService<AvroSchema> {

  @Override
  public SchemaTypeDTO getType() {
    return SchemaTypeDTO.AVRO;
  }

  @Override
  public AvroSchema parseSchema(String schema) throws SchemaParserError {
    try {
      return new AvroSchema(schema);
    } catch (SchemaParseException e) {
      throw new SchemaParserError(e.getMessage(), e);
    }
  }

  @Override
  public String parseValidationErrors(String json5) {
    try {
      return Json5Parser.json5ToJSON(json5);
    } catch (SyntaxError e) {
      throw new RuntimeException("Unexpected error while parsing JSON5 validation errors for Avro Compatibility", e);
    }
  }
}
