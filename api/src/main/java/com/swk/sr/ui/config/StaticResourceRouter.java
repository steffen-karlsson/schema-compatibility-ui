package com.swk.sr.ui.config;

import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Service
public class StaticResourceRouter {
  @Bean
  RouterFunction<ServerResponse> router() {
    return RouterFunctions.resources("/**", new ClassPathResource("static/"));
  }
}
