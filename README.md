# Spring AI: DeepSeek and Ollama Integration

Welcome to a practical demonstration of integrating multiple AI models with Spring Boot! This project showcases how to leverage Spring AI to interact with both DeepSeek and Ollama models through a clean, Spring-native API.

## Overview

This Spring Boot application demonstrates:
- Integration with DeepSeek's API using Spring AI's OpenAI client
- Local AI model usage through Ollama
- Streaming and non-streaming responses from AI models
- Simple REST endpoints for AI interactions

## Project Requirements

- Java 17 or higher
- Spring Boot 3.x
- Spring AI dependencies
- DeepSeek API key
- Ollama installed locally with the deepseek-r1:7b model

## Core Dependencies

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-ollama-spring-boot-starter</artifactId>
    </dependency>
</dependencies>
```
