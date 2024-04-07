package com.swk.sr.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SchemaCompatibilityUIApplication {
  public static void main(String[] args) {
    SpringApplication.run(SchemaCompatibilityUIApplication.class, args);
  }
}
