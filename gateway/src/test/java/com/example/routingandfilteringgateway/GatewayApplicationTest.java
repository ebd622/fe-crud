package com.example.routingandfilteringgateway;

import com.netflix.zuul.context.RequestContext;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT, classes = RoutingAndFilteringGatewayApplication.class)
public class GatewayApplicationTest {

    @Autowired
    private TestRestTemplate rest;

    static ConfigurableApplicationContext productsService;
    private static final String PRODUCT_BIKE = "{id: \"1\",name: \"Bike\",description: \"Brand: Gazelle \",price: \"100\"}";

    @BeforeAll
    public static void startProductsService() {
        productsService = SpringApplication.run(ProductService.class,"--server.port=9099");
    }

    @AfterAll
    public static void closeProductsService() {
        productsService.close();
    }

    @BeforeEach
    public void setup() {
        RequestContext.testSetCurrentContext(new RequestContext());
    }

    @Test
    public void test() {
        String resp = rest.getForObject("/products", String.class);
        assertThat(resp).isEqualTo(PRODUCT_BIKE);
    }

    @Configuration
    @EnableAutoConfiguration
    @RestController
    static class ProductService {
        @RequestMapping("/api/v1/products")
        public String getAvailable() {
            return PRODUCT_BIKE;
        }
    }
}
