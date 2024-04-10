package com.swk.sr.ui.utils;

import blue.endless.jankson.Jankson;
import blue.endless.jankson.api.SyntaxError;
import java.util.regex.Pattern;

public class Json5Parser {

  private static final Pattern pattern = Pattern.compile("(?<!:)(?<!: )'(?!,)(?! ,)(?!})(?! })");

  private Json5Parser() {
    // Utility class
  }

  public static String json5ToJSON(String json5) {
    try {
      String replacedJson5 = json5.replaceAll(pattern.pattern(), "");
      return Jankson.builder().build().load(replacedJson5).toJson();
    } catch (SyntaxError e) {
      throw new RuntimeException(e);
    }
  }
}
