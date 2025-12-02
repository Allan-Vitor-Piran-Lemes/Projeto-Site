package br.edu.utfpr.pb.pw44s.server.error;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    // Tratamento para erro de validação de campos (@Valid)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handlerValidationException(MethodArgumentNotValidException exception,
                                               HttpServletRequest request) {
        BindingResult result = exception.getBindingResult();
        Map<String, String> validationErrors = new HashMap<>();
        for (FieldError fieldError : result.getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return new ApiError(HttpStatus.BAD_REQUEST.value(), "Erro de validação!",
                request.getServletPath(), validationErrors);
    }

    // Tratamento para IllegalStateException (ex: email duplicado)
    @ExceptionHandler({IllegalStateException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handlerIllegalStateException(IllegalStateException exception,
                                                 HttpServletRequest request) {
        return new ApiError(HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(),
                request.getServletPath());
    }

    // Tratamento para JSON inválido
    @ExceptionHandler({HttpMessageNotReadableException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handlerJsonException(HttpMessageNotReadableException exception,
                                         HttpServletRequest request) {
        return new ApiError(HttpStatus.BAD_REQUEST.value(), "Corpo da requisição inválido!",
                request.getServletPath());
    }
}