package com.swk.sr.ui.controller;

import com.swk.sr.ui.api.SchemaCompatibilityApi;
import com.swk.sr.ui.error.SchemaCompareError;
import com.swk.sr.ui.model.SchemaCompatibilityResponseDTO;
import com.swk.sr.ui.model.SchemaCompatibilitySubjectDTO;
import com.swk.sr.ui.service.AvroCompatibilityService;
import com.swk.sr.ui.service.JSONCompatibilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class CompatibilityController implements SchemaCompatibilityApi {

  private final AvroCompatibilityService avroCompatibilityService;
  private final JSONCompatibilityService jsonCompatibilityService;

  @Override
  public Mono<ResponseEntity<SchemaCompatibilityResponseDTO>> compareSchemas(
      Mono<SchemaCompatibilitySubjectDTO> schemaCompatibilitySubjectDTO, ServerWebExchange exchange) {
    return schemaCompatibilitySubjectDTO
        .flatMap(this::compareSchemas)
        .onErrorResume(SchemaCompareError.class,
            e -> Mono.just(new SchemaCompatibilityResponseDTO(false, e.getMessage())))
        .map(ResponseEntity::ok);
  }

  private Mono<SchemaCompatibilityResponseDTO> compareSchemas(
      SchemaCompatibilitySubjectDTO schemaCompatibilitySubjectDTO) {
    try {
      return switch (schemaCompatibilitySubjectDTO.getSchemaType()) {
        case AVRO -> Mono.just(avroCompatibilityService.compareSchemas(schemaCompatibilitySubjectDTO));
        case JSON -> Mono.just(jsonCompatibilityService.compareSchemas(schemaCompatibilitySubjectDTO));
      };
    } catch (SchemaCompareError e) {
      return Mono.error(e);
    }
  }
}
