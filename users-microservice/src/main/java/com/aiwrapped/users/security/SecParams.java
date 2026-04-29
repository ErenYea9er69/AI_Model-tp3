package com.aiwrapped.users.security;

public interface SecParams {
    long EXP_TIME = 10 * 24 * 60 * 60 * 1000; // 10 days
    String SECRET = "aiwrappedb@yahoo.com";
    String PREFIX = "Bearer ";
}
