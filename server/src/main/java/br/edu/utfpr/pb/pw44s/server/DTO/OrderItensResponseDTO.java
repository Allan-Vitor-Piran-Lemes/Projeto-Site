package br.edu.utfpr.pb.pw44s.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItensResponseDTO {
    private Long id;
    private ProductDTO product; // Importante: Traz o produto completo (nome, imagem)
    private Integer quantity;
    private BigDecimal unit_price;
}