package com.swk.sr.ui.utils;

import org.apache.avro.Schema;

public class SchemaUtils {
  public static Schema toSchema(String schema) {
    return new Schema.Parser().parse(schema);
  }
}
