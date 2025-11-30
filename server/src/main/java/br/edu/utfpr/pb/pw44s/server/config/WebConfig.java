package br.edu.utfpr.pb.pw44s.server.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer { // <--- ESSA PARTE É ESSENCIAL

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Override // Agora o vermelho vai sumir corretamente
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Libera o acesso à pasta assetsImages via URL
        registry.addResourceHandler("/assetsImages/**")
                .addResourceLocations("classpath:/assetsImages/");
    }
}