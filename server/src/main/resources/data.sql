/*-- LIMPEZA (Opcional, se precisar resetar)
-- DELETE FROM product_gallery;
-- DELETE FROM product_specifications;
-- DELETE FROM tb_order_itens;
-- DELETE FROM tb_product;
-- DELETE FROM tb_category;*/

-- 1. CATEGORIAS
INSERT INTO tb_category (id, name) VALUES (1, 'Guerra');
INSERT INTO tb_category (id, name) VALUES (2, 'Estratégia');
INSERT INTO tb_category (id, name) VALUES (3, 'Cooperativo');
INSERT INTO tb_category (id, name) VALUES (4, 'Cartas');
INSERT INTO tb_category (id, name) VALUES (5, 'Clássicos');

-- 2. PRODUTOS COMPLETOS (Baseado no seu JSON)

-- ID 1: Catan
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (1, 'Catan', 249.90, '/assets/images/Catan.jpg', 'Em até 12x sem juros',
     'Descubra tudo sobre o jogo Catan (Os Colonizadores de Catan), um dos board games mais famosos do mundo! Aprenda as regras, estratégias, expansões e curiosidades. Encontre dicas para iniciantes, análises de expansões e onde comprar. Junte-se à comunidade de fãs de Catan!', 2);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (1, 'Marca: KOSMOS'), (1, 'Material: Papelão'), (1, 'Tema: Fantasia Medieval'), (1, 'Gênero: Estratégia'), (1, 'Jogadores: 3-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (1, '/assets/images/catan2.png'), (1, '/assets/images/catan3.webp'), (1, '/assets/images/catan4.webp');

-- ID 2: Azul
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (2, 'Azul', 399.90, '/assets/images/Azul.jpg', 'Em até 10x sem juros',
     'Azul é um jogo premiado onde os jogadores competem para decorar as paredes do Palácio Real de Évora com azulejos coloridos, combinando estratégia e habilidade.', 2);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (2, 'Marca: Next Move Games'), (2, 'Material: Papelão'), (2, 'Tema: Azulejos e Decoração'), (2, 'Gênero: Estratégia Familiar'), (2, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (2, '/assets/images/azul2.jpeg'), (2, '/assets/images/azul3.jpg'), (2, '/assets/images/azul4.jpg');

-- ID 3: Bohnanza
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (3, 'Bohnanza', 211.99, '/assets/images/Bohnanza.png', 'Em até 10x sem juros',
     'Bohnanza é um jogo divertido de negociação e estratégia onde os jogadores cultivam feijões para trocar e lucrar, exigindo boa comunicação e tática.', 2);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (3, 'Marca: Amigo Spiele'), (3, 'Material: Papelão'), (3, 'Tema: Plantação de Feijão'), (3, 'Gênero: Estratégia'), (3, 'Jogadores: 3-5');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (3, '/assets/images/bohnanza2.webp'), (3, '/assets/images/bohnanza3.webp'), (3, '/assets/images/bohnanza4.avif');

-- ID 4: Certo ou Errado
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (4, 'Certo ou Errado', 150.90, '/assets/images/CertoouErrado.webp', 'Em até 10x sem juros',
     'Certo ou Errado é um jogo rápido de perguntas e respostas que testa seu conhecimento e raciocínio, perfeito para grupos e festas.', 4);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (4, 'Marca: Brain Games'), (4, 'Material: Cartas'), (4, 'Tema: Quiz e Conhecimento'), (4, 'Gênero: Party Game'), (4, 'Jogadores: 2-8');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (4, '/assets/images/certoouerrao2.webp'), (4, '/assets/images/certoouerrado3.jpg'), (4, '/assets/images/certoouerrado4.jpg');

-- ID 5: CuBirds
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (5, 'CuBirds', 277.24, '/assets/images/CuBirds.jpg', 'Em até 10x sem juros',
     'CuBirds é um jogo encantador onde os jogadores colecionam aves raras, usando estratégia e sorte para vencer.', 4);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (5, 'Marca: XYZ Games'), (5, 'Material: Cartas e Peças'), (5, 'Tema: Aves e Estratégia'), (5, 'Gênero: Familiar'), (5, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (5, '/assets/images/cubirds2.JPG'), (5, '/assets/images/cubirds3.jpg'), (5, '/assets/images/cubirds4.jpg');

-- ID 6: Distilled
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (6, 'Distilled', 320.99, '/assets/images/Distilled.webp', 'Em até 10x sem juros',
     'Distilled desafia os jogadores a criar as melhores bebidas destiladas, combinando estratégia e sorte para dominar o mercado.', 2);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (6, 'Marca: ABC Entertainment'), (6, 'Material: Cartas'), (6, 'Tema: Produção de Bebidas'), (6, 'Gênero: Estratégia'), (6, 'Jogadores: 2-6');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (6, '/assets/images/distilled2.webp'), (6, '/assets/images/distilled3.jpg'), (6, '/assets/images/distilled4.jpg');

-- ID 7: Gatinho (Exploding Kittens)
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (7, 'Gatinho', 200.99, '/assets/images/Gatinho.jpg', 'Em até 10x sem juros',
     'Gatinho é um jogo divertido que envolve cuidado e estratégia com gatinhos fofos para toda família.', 3);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (7, 'Marca: Pet Games'), (7, 'Material: Cartas e Peças'), (7, 'Tema: Animais'), (7, 'Gênero: Familiar'), (7, 'Jogadores: 2-5');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (7, '/assets/images/gatinho2.jpg'), (7, '/assets/images/gatinho3.jpg'), (7, '/assets/images/gatinho4.webp');

-- ID 8: Pandemic
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (8, 'Pandemic', 415.70, '/assets/images/Pandemic.jpg', 'Em até 10x sem juros',
     'Pandemic é um clássico jogo cooperativo onde os jogadores unem forças para conter epidemias que ameaçam o mundo.', 3);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (8, 'Marca: Z-Man Games'), (8, 'Material: Cartas e Peças'), (8, 'Tema: Cooperação e Epidemias'), (8, 'Gênero: Estratégia Cooperativa'), (8, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (8, '/assets/images/pandemic2.webp'), (8, '/assets/images/pandemic3.jpg'), (8, '/assets/images/pandemic4.jpg');

-- ID 9: Red7
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (9, 'Red7', 178.90, '/assets/images/Red7.webp', 'Em até 10x sem juros',
     'Red7 é um jogo rápido e estratégico onde as regras mudam a cada rodada, exigindo adaptação constante dos jogadores.', 4);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (9, 'Marca: Asmadi Games'), (9, 'Material: Cartas'), (9, 'Tema: Estratégia e Mudança de Regras'), (9, 'Gênero: Party Game'), (9, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (9, '/assets/images/red72.jpg'), (9, '/assets/images/red73.png'), (9, '/assets/images/red74.webp');

-- ID 10: Splendor
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (10, 'Splendor', 305.80, '/assets/images/Splendor.jpg', 'Em até 10x sem juros',
     'Splendor é um jogo de estratégia onde jogadores competem para coletar gemas e comprar cartas para conquistar prestígio.', 1);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (10, 'Marca: Space Cowboys'), (10, 'Material: Cartas e Peças'), (10, 'Tema: Comércio e Gemas'), (10, 'Gênero: Estratégia'), (10, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (10, '/assets/images/splendor2.jpg'), (10, '/assets/images/splendor3.webp'), (10, '/assets/images/splendor4.webp');

-- ID 11: Terra Mistica
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (11, 'Terra Mistica', 860.90, '/assets/images/TerraMistica.webp', 'Em até 10x sem juros',
     'Terra Mistica é um jogo de estratégia profunda onde os jogadores desenvolvem suas facções para dominar o mapa.', 5);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (11, 'Marca: Feuerland Spiele'), (11, 'Material: Peças e Tabuleiro'), (11, 'Tema: Fantasia e Estratégia'), (11, 'Gênero: Estratégia Complexa'), (11, 'Jogadores: 2-5');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (11, '/assets/images/terramistica2.png'), (11, '/assets/images/terramistica3.jpg'), (11, '/assets/images/terramistica4.webp');

-- ID 12: Welcome
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (12, 'Welcome', 299.90, '/assets/images/Welcome.jpg', 'Em até 10x sem juros',
     'Welcome é um jogo leve e estratégico onde os jogadores desenvolvem a cidade americana ideal através de planejamento cuidadoso.', 1);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (12, 'Marca: Blue Orange Games'), (12, 'Material: Cartas'), (12, 'Tema: Construção e Planejamento'), (12, 'Gênero: Estratégia Familiar'), (12, 'Jogadores: 1-5');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (12, '/assets/images/welcome2.jpeg'), (12, '/assets/images/welcome3.jpeg'), (12, '/assets/images/welcome4.jpeg');

