package com.nadhem.aiwrappers.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfig implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.execute("SET GLOBAL max_allowed_packet=16777216");
            jdbcTemplate.execute("ALTER TABLE image MODIFY image LONGBLOB");
            System.out.println("Successfully altered 'image' table and max_allowed_packet to support large images.");
        } catch (Exception e) {
            System.err.println("Could not alter table: " + e.getMessage());
        }
    }
}
