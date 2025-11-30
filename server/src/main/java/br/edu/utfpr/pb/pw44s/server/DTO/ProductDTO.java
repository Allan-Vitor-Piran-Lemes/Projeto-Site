package br.edu.utfpr.pb.pw44s.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;

    // O Front espera 'image', a Entidade tem 'image'. O DTO precisava ter 'image'.
    private String image;

    // Campos adicionais para bater com a sua Entidade e Front-end
    private String installmentInfo;
    private List<String> specifications;
    private List<String> gallery;

    private CategoryDTO category;
}