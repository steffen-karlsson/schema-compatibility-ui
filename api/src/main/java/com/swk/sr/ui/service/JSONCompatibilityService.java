package com.swk.sr.ui.service;

import blue.endless.jankson.api.SyntaxError;
import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.model.SchemaTypeDTO;
import com.swk.sr.ui.utils.Json5Parser;
import io.confluent.kafka.schemaregistry.json.JsonSchema;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;

@Service
public class JSONCompatibilityService extends AbstractCompatibilityService<JsonSchema> {

  private static final String WRONG_JSON5_SYNTAX_EOF = "Expected to find '\"' to end a String, found EOF instead.";
  private static final Pattern WRONG_JSON5_SYNTAX_EOF_MATCHER = Pattern.compile(":(\"[^\"]+)[,}]");

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

  @Override
  public String parseValidationErrors(String json5) {
    try {
      return Json5Parser.json5ToJSON(json5);
    } catch (SyntaxError e) {
      if (e.getMessage().equalsIgnoreCase(WRONG_JSON5_SYNTAX_EOF)) {
        Matcher matcher = WRONG_JSON5_SYNTAX_EOF_MATCHER.matcher(json5);
        if (matcher.find()) {
          String message = json5.substring(matcher.start() + 1, matcher.end() - 1);
          String correctedJSON5Syntax = "\"" + message.substring(1, message.length() - 1) + "\"";
          return parseValidationErrors(json5.replace(message, correctedJSON5Syntax));
        }
      }

      throw new RuntimeException("Unexpected error while parsing JSON5 validation errors for JSON Compatibility", e);
    }
  }
}
