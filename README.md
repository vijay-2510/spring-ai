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

## Getting Started

1. Set up your environment variables:
```bash
export DEEPSEEK_API_KEY=your_api_key_here
```

2. Install Ollama and pull the required model:
```bash
ollama pull deepseek-r1:7b
```

3. Configure your application.properties:
```properties
spring.ai.openai.api-key=${DEEPSEEK_API_KEY}
spring.ai.openai.base-url=https://api.deepseek.com
spring.ai.openai.chat.options.model=deepseek-reasoner
spring.ai.ollama.chat.model=deepseek-r1:7b
```

## Using the Application

The application provides several endpoints for interacting with AI models:

### DeepSeek Endpoints

```java
@GetMapping("/deepseek")
public String deepseek() {
    return chatClient.prompt()
            .user("How many r's are in Strawberry")
            .call()
            .content();
}

@GetMapping("/deepseek-stream")
public Flux<String> deepseekStream() {
    return chatClient.prompt()
            .user("How many r's are in Strawberry")
            .stream()
            .content();
}
```

### Ollama Endpoint

```java
@GetMapping("/ollama")
public Flux<String> ollama() {
    return chatClient.prompt()
            .user("Can you give an example of a leet style coding problem and answer it in Java")
            .stream()
            .content();
}
```

## Architecture Overview

The project follows a clean architecture with separate controllers for each AI provider:

1. `Application.java`: Configures chat clients for both providers
2. `DeepSeekController.java`: Handles DeepSeek API interactions
3. `OllamaChatController.java`: Manages local Ollama model interactions

### Chat Client Configuration

```java
@Bean
public ChatClient openAiChatClient(OpenAiChatModel chatModel) {
    return ChatClient.create(chatModel);
}

@Bean
public ChatClient ollamaChatClient(OllamaChatModel chatModel) {
    return ChatClient.create(chatModel);
}
```

## Making Requests

Test the endpoints using curl or your preferred HTTP client:

```bash
# Basic DeepSeek request
curl http://localhost:8080/deepseek

# Streaming DeepSeek response
curl http://localhost:8080/deepseek-stream

# Ollama coding challenge
curl http://localhost:8080/ollama
```

## Development Notes

- The application uses qualifier annotations to distinguish between chat clients:
  ```java
  @Qualifier("openAiChatClient")
  @Qualifier("ollamaChatClient")
  ```
- Streaming responses use Spring WebFlux's `Flux` for efficient handling
- The configuration supports easy swapping between different AI models

## Next Steps

- Add support for more AI models
- Implement more complex prompt engineering
- Add request/response caching
- Include rate limiting and error handling
- Add authentication and authorization

This project serves as a foundation for building AI-powered Spring applications. We look forward to seeing how you extend and enhance it!