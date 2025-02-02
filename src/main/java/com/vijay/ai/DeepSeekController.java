package com.vijay.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DeepSeekController {

    private final ChatClient chatClient;

    public DeepSeekController(@Qualifier("ollamaChatClient") ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @GetMapping("/v2/{chat}")
    public String deepseek(@PathVariable String chat) {
        return chatClient.prompt()
                .user(chat)
                .call()
                .content();
    }

    @GetMapping("/v2/stream/{chat}")
    public Flux<String> deepseekStream(@PathVariable String chat) {
        return chatClient.prompt()
                .user(chat)
                .stream()
                .content();
    }

}
