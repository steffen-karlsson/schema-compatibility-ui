package com.swk.sr.ui.service;

import blue.endless.jankson.api.SyntaxError;
import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.model.SchemaTypeDTO;
import com.swk.sr.ui.utils.Json5Parser;
import io.confluent.kafka.schemaregistry.protobuf.ProtobufSchema;
import org.springframework.stereotype.Service;

@Service
public class ProtobufCompatibilityService extends AbstractCompatibilityService<ProtobufSchema> {
  @Override
  public SchemaTypeDTO getType() {
    return SchemaTypeDTO.PROTOBUF;
  }

  @Override
  public ProtobufSchema parseSchema(String schema) throws SchemaParserError {
    try {
      return new ProtobufSchema(schema);
    } catch (IllegalArgumentException e) {
      throw new SchemaParserError("Invalid schema", e);
    }
  }

  @Override
  public String parseValidationErrors(String json5) {
    try {
      return Json5Parser.json5ToJSON(json5);
    } catch (SyntaxError e) {
      throw new RuntimeException("Unexpected error while parsing JSON5 validation errors for Protobuf Compatibility",
          e);
    }
  }
}
