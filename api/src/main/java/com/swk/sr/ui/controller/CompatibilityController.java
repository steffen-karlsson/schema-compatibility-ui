package com.swk.sr.ui.controller;

import com.swk.sr.ui.api.SchemaCompatibilityApi;
import com.swk.sr.ui.error.SchemaCompareError;
import com.swk.sr.ui.error.SchemaParserError;
import com.swk.sr.ui.factory.SchemaProviderFactory;
import com.swk.sr.ui.model.SchemaCompatibilityResponseDTO;
import com.swk.sr.ui.model.SchemaCompatibilitySubjectDTO;
import com.swk.sr.ui.service.AbstractCompatibilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class CompatibilityController implements SchemaCompatibilityApi {

  private final SchemaProviderFactory schemaProviderFactory;

  @Override
  public Mono<ResponseEntity<SchemaCompatibilityResponseDTO>> compareSchemas(
      Mono<SchemaCompatibilitySubjectDTO> schemaCompatibilitySubjectDTO, ServerWebExchange exchange) {
    return schemaCompatibilitySubjectDTO
        .flatMap(this::compareSchemas)
        .onErrorMap(SchemaCompareError.class,
            e -> new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, e.getMessage(), e))
        .map(ResponseEntity::ok);
  }

  private Mono<SchemaCompatibilityResponseDTO> compareSchemas(
      SchemaCompatibilitySubjectDTO schemaCompatibilitySubjectDTO) {
    try {
      AbstractCompatibilityService.SchemaCompatibilityResult result =
          schemaProviderFactory.getProvider(schemaCompatibilitySubjectDTO.getSchemaType())
              .compareSchemas(schemaCompatibilitySubjectDTO);
      return Mono.just(new SchemaCompatibilityResponseDTO(result.isCompatible(), result.errors()));
    } catch (SchemaCompareError | SchemaParserError e) {
      return Mono.error(e);
    }
  }
}
