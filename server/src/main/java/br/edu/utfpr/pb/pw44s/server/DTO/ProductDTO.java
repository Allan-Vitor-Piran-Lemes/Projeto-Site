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

    // Corrigido de url_image para image para bater com a Entidade e o Front
    private String image;

    // Novos campos adicionados para bater com a Entidade Product
    private String installmentInfo;
    private List<String> specifications;
    private List<String> gallery;

    private CategoryDTO category;
}
