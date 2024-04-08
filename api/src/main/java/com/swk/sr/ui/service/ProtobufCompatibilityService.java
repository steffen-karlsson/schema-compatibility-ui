package com.swk.sr.ui.service;

import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.model.SchemaTypeDTO;
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
}
