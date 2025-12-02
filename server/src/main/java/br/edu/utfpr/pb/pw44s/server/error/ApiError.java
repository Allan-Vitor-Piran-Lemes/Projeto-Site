package br.edu.utfpr.pb.pw44s.server.error;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
public class ApiError {
    private final long timestamp = new Date().getTime();
    private String message;
    private int status;
    private String url;
    private Map<String, String> validationErrors;

    // Construtor para erros simples (sem validação de campos)
    public ApiError(int status, String message, String url) {
        this.status = status;
        this.message = message;
        this.url = url;
    }

    // Construtor completo (com validação de campos)
    public ApiError(int status, String message, String url, Map<String, String> validationErrors) {
        this.status = status;
        this.message = message;
        this.url = url;
        this.validationErrors = validationErrors;
    }
}