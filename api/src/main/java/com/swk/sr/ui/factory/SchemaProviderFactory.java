package com.swk.sr.ui.factory;

import com.swk.sr.ui.model.SchemaTypeDTO;
import com.swk.sr.ui.service.AbstractCompatibilityService;
import jakarta.annotation.PostConstruct;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class SchemaProviderFactory {

  private static final Map<SchemaTypeDTO, AbstractCompatibilityService<?>> CACHE = new EnumMap<>(SchemaTypeDTO.class);
  private final List<AbstractCompatibilityService<?>> services;

  public SchemaProviderFactory(List<AbstractCompatibilityService<?>> services) {
    this.services = services;
  }

  @PostConstruct
  public void initCache() {
    for (AbstractCompatibilityService<?> service : services) {
      CACHE.put(service.getType(), service);
    }
  }

  public AbstractCompatibilityService<?> getProvider(SchemaTypeDTO type) {
    AbstractCompatibilityService<?> service = CACHE.get(type);
    if (service == null) {
      throw new RuntimeException("Unknown service type: " + type);
    }
    return service;
  }
}
