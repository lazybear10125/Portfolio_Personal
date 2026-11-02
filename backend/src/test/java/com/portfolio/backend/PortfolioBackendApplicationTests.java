package com.portfolio.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
class PortfolioBackendApplicationTests {

    @Test
    void contextLoads() {
        // Confirms Spring application context bootstraps successfully with Spring Security, JPA & Web
    }
}
