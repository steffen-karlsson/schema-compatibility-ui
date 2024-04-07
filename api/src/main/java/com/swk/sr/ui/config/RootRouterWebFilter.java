package com.swk.sr.ui.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Configuration
public class RootRouterWebFilter implements WebFilter {
  @Override
  public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
    final String path = exchange.getRequest().getPath().pathWithinApplication().value();
    if (path.equals("/")) {
      return chain.filter(
          exchange.mutate().request(
              exchange.getRequest().mutate()
                  .path("/index.html")
                  .build()
          ).build()
      );
    }
    return chain.filter(exchange);
  }
}
