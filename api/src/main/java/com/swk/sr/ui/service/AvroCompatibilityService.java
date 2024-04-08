package com.swk.sr.ui.service;

import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.model.SchemaTypeDTO;
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
      throw new SchemaParserError("Invalid schema", e);
    }
  }
}
