--import.sql

-- Categorias
INSERT INTO tb_category (id, name) VALUES (1, 'Guerra');
INSERT INTO tb_category (id, name) VALUES (2, 'Estratégia');
INSERT INTO tb_category (id, name) VALUES (3, 'Cooperativo');
INSERT INTO tb_category (id, name) VALUES (4, 'Cartas');
INSERT INTO tb_category (id, name) VALUES (5, 'Clássicos');

-- PRODUTO 1: Catan
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (1, 'Catan', 249.90, '/assets/images/Catan.jpg', 'Em até 12x sem juros',
     'Descubra tudo sobre o jogo Catan (Os Colonizadores de Catan), um dos board games mais famosos do mundo! Aprenda as regras, estratégias, expansões e curiosidades.', 2);

INSERT INTO product_specifications (product_id, specification) VALUES (1, 'Marca: KOSMOS');
INSERT INTO product_specifications (product_id, specification) VALUES (1, 'Material: Papelão');
INSERT INTO product_specifications (product_id, specification) VALUES (1, 'Jogadores: 3-4');

INSERT INTO product_gallery (product_id, image_url) VALUES (1, '/assets/images/catan2.png');
INSERT INTO product_gallery (product_id, image_url) VALUES (1, '/assets/images/catan3.webp');
INSERT INTO product_gallery (product_id, image_url) VALUES (1, '/assets/images/catan4.webp');


-- PRODUTO 2: Azul
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (2, 'Azul', 399.90, '/assets/images/Azul.jpg', 'Em até 10x sem juros',
     'Azul é um jogo premiado onde os jogadores competem para decorar as paredes do Palácio Real de Évora com azulejos coloridos.', 2);

INSERT INTO product_specifications (product_id, specification) VALUES (2, 'Marca: Next Move');
INSERT INTO product_specifications (product_id, specification) VALUES (2, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES (2, '/assets/images/azul2.jpeg');
INSERT INTO product_gallery (product_id, image_url) VALUES (2, '/assets/images/azul3.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (2, '/assets/images/azul4.jpg');


-- PRODUTO 3: Bohnanza
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (3, 'Bohnanza', 211.99, '/assets/images/Bohnanza.png', 'Em até 10x sem juros',
     'Bohnanza é um jogo divertido de negociação onde os jogadores cultivam feijões para trocar e lucrar.', 2);

INSERT INTO product_specifications (product_id, specification) VALUES (3, 'Marca: Amigo Spiele');
INSERT INTO product_specifications (product_id, specification) VALUES (3, 'Jogadores: 3-5');

INSERT INTO product_gallery (product_id, image_url) VALUES (3, '/assets/images/bohnanza2.webp');
INSERT INTO product_gallery (product_id, image_url) VALUES (3, '/assets/images/bohnanza3.webp');
INSERT INTO product_gallery (product_id, image_url) VALUES (3, '/assets/images/bohnanza4.avif');


-- PRODUTO 4: Certo ou Errado
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (4, 'Certo ou Errado', 150.90, '/assets/images/CertoouErrado.webp', 'Em até 10x sem juros',
     'Um jogo rápido de perguntas e respostas que testa seu conhecimento e raciocínio.', 4);

INSERT INTO product_specifications (product_id, specification) VALUES (4, 'Gênero: Party Game');
INSERT INTO product_specifications (product_id, specification) VALUES (4, 'Jogadores: 2-8');

INSERT INTO product_gallery (product_id, image_url) VALUES (4, '/assets/images/certoouerrao2.webp');
INSERT INTO product_gallery (product_id, image_url) VALUES (4, '/assets/images/certoouerrado3.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (4, '/assets/images/certoouerrado4.jpg');


-- PRODUTO 5: CuBirds
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (5, 'CuBirds', 277.24, '/assets/images/CuBirds.jpg', 'Em até 10x sem juros',
     'Colecione aves raras neste jogo de estratégia leve e arte encantadora.', 4);

INSERT INTO product_specifications (product_id, specification) VALUES (5, 'Tema: Aves');
INSERT INTO product_specifications (product_id, specification) VALUES (5, 'Jogadores: 2-5');

INSERT INTO product_gallery (product_id, image_url) VALUES (5, '/assets/images/cubirds2.JPG');
INSERT INTO product_gallery (product_id, image_url) VALUES (5, '/assets/images/cubirds3.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (5, '/assets/images/cubirds4.jpg');


-- PRODUTO 6: Distilled
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (6, 'Distilled', 320.99, '/assets/images/Distilled.webp', 'Em até 10x sem juros',
     'Desafie-se a criar as melhores bebidas destiladas combinando ingredientes e estratégia.', 2);

INSERT INTO product_specifications (product_id, specification) VALUES (6, 'Tema: Bebidas');
INSERT INTO product_specifications (product_id, specification) VALUES (6, 'Jogadores: 1-5');

INSERT INTO product_gallery (product_id, image_url) VALUES (6, '/assets/images/distilled2.webp');
INSERT INTO product_gallery (product_id, image_url) VALUES (6, '/assets/images/distilled3.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (6, '/assets/images/distilled4.jpg');


-- PRODUTO 7: Gatinho
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (7, 'Gatinho', 200.99, '/assets/images/Gatinho.jpg', 'Em até 10x sem juros',
     'Um jogo explosivo e divertido envolvendo gatinhos e muito caos.', 3);

INSERT INTO product_specifications (product_id, specification) VALUES (7, 'Gênero: Familiar');
INSERT INTO product_specifications (product_id, specification) VALUES (7, 'Jogadores: 2-5');

INSERT INTO product_gallery (product_id, image_url) VALUES (7, '/assets/images/gatinho2.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (7, '/assets/images/gatinho3.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (7, '/assets/images/gatinho4.webp');


-- PRODUTO 8: Pandemic
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (8, 'Pandemic', 415.70, '/assets/images/Pandemic.jpg', 'Em até 10x sem juros',
     'Trabalhem juntos como uma equipe de especialistas para impedir pandemias globais.', 3);

INSERT INTO product_specifications (product_id, specification) VALUES (8, 'Gênero: Cooperativo');
INSERT INTO product_specifications (product_id, specification) VALUES (8, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES (8, '/assets/images/pandemic2.webp');
INSERT INTO product_gallery (product_id, image_url) VALUES (8, '/assets/images/pandemic3.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (8, '/assets/images/pandemic4.jpg');


-- PRODUTO 9: Red7
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (9, 'Red7', 178.90, '/assets/images/Red7.webp', 'Em até 10x sem juros',
     'As regras mudam o tempo todo! Se você não estiver ganhando no final do seu turno, você perde.', 4);

INSERT INTO product_specifications (product_id, specification) VALUES (9, 'Gênero: Cartas');
INSERT INTO product_specifications (product_id, specification) VALUES (9, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES (9, '/assets/images/red72.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (9, '/assets/images/red73.png');
INSERT INTO product_gallery (product_id, image_url) VALUES (9, '/assets/images/red74.webp');


-- PRODUTO 10: Splendor
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (10, 'Splendor', 305.80, '/assets/images/Splendor.jpg', 'Em até 10x sem juros',
     'Assuma o papel de um mercador rico da Renascença e use seus recursos para adquirir minas e transporte.', 1);

INSERT INTO product_specifications (product_id, specification) VALUES (10, 'Marca: Space Cowboys');
INSERT INTO product_specifications (product_id, specification) VALUES (10, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES (10, '/assets/images/splendor2.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (10, '/assets/images/splendor3.webp');
INSERT INTO product_gallery (product_id, image_url) VALUES (10, '/assets/images/splendor4.webp');


-- PRODUTO 11: Terra Mistica
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (11, 'Terra Mistica', 860.90, '/assets/images/TerraMistica.webp', 'Em até 10x sem juros',
     'Governe uma das 14 facções e transforme a paisagem a seu favor neste jogo de estratégia profunda.', 5);

INSERT INTO product_specifications (product_id, specification) VALUES (11, 'Complexidade: Alta');
INSERT INTO product_specifications (product_id, specification) VALUES (11, 'Jogadores: 2-5');

INSERT INTO product_gallery (product_id, image_url) VALUES (11, '/assets/images/terramistica2.png');
INSERT INTO product_gallery (product_id, image_url) VALUES (11, '/assets/images/terramistica3.jpg');
INSERT INTO product_gallery (product_id, image_url) VALUES (11, '/assets/images/terramistica4.webp');


-- PRODUTO 12: Welcome
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (12, 'Welcome', 299.90, '/assets/images/Welcome.jpg', 'Em até 10x sem juros',
     'Construa a cidade perfeita dos anos 50 neste jogo de "roll and write" sem dados.', 1);

INSERT INTO product_specifications (product_id, specification) VALUES (12, 'Gênero: Estratégia');
INSERT INTO product_specifications (product_id, specification) VALUES (12, 'Jogadores: 1-100');

INSERT INTO product_gallery (product_id, image_url) VALUES (12, '/assets/images/welcome2.jpeg');
INSERT INTO product_gallery (product_id, image_url) VALUES (12, '/assets/images/welcome3.jpeg');
INSERT INTO product_gallery (product_id, image_url) VALUES (12, '/assets/images/welcome4.jpeg');

/*insert into tb_category (id, name) values (1, 'Guerra');
insert into tb_category (id, name) values (2, 'Estratégia');
insert into tb_category (id, name) values (3, 'Cooperativo');
insert into tb_category (id, name) values (4, 'Cartas');
insert into tb_category (id, name) values (5, 'Clássicos');

-- server/src/main/resources/import.sql

-- (Mantenha os inserts de categoria como estão)

-- Produtos com as imagens principais corrigidas
insert into tb_product (id, name, description, price, category_id, url_image) values (1, 'Catan', 'Descubra tudo sobre o jogo Catan...', 249.90, 2, 'catanprincipal.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (2, 'Azul', 'Azul é um jogo premiado...', 399.90, 2, 'azulprincipal.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (3, 'Bonanza', 'Bonanza é um jogo divertido...', 211.99, 2, 'bohnanzaprincipal.png');

insert into tb_product (id, name, description, price, category_id, url_image) values (4, 'Certo ou Errado', 'Certo ou Errado é um jogo rápido...', 150.90, 4, 'certoouerradoprincipal.webp');

insert into tb_product (id, name, description, price, category_id, url_image) values (5, 'CuBirds', 'CuBirds é um jogo encantador...', 277.24, 4, 'cubirdsprincipal.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (6, 'Distilled', 'Distilled desafia os jogadores...', 320.99, 2, 'distilledprincipal.webp');

insert into tb_product (id, name, description, price, category_id, url_image) values (7, 'Gatinho', 'Gatinho é um jogo divertido...', 200.99, 3, 'gatinhoprincipal.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (8, 'Pandemic', 'Pandemic é um clássico jogo...', 415.70, 3, 'pandemicprincipal.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (9, 'Red7', 'Red7 é um jogo rápido...', 178.90, 4, 'red7principal.webp');

insert into tb_product (id, name, description, price, category_id, url_image) values (10, 'Splendor', 'Splendor é um jogo de estratégia...', 305.80, 1, 'splendorprincipal.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (11, 'Terra Mistica', 'Terra Mistica é um jogo...', 860.90, 5, 'terramisticaprincipal.webp');

insert into tb_product (id, name, description, price, category_id, url_image) values (12, 'Welcome', 'Welcome é um jogo leve...', 299.90, 1, 'welcomeprincipal.jpg');

-- (Mantenha os inserts de user e address como estão)

INSERT INTO tb_user(display_name, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');/*123*/
INSERT INTO tb_user(display_name, username, password) VALUES ('Teste', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem'); /*123*/


INSERT INTO tb_address(user_id, city, logradouro, numero, bairro, complemento, cep) VALUES (1, 'Pato Branco', 'Rua Vicente Machado', 1230, 'Menino Deus', 'Condominio', '12345678');
INSERT INTO tb_address(user_id, city, logradouro, numero, bairro, complemento, cep) VALUES (2, 'São Lourenço do Oeste', 'Rua Rio de Janeiro', 85, 'Perpétuo Socorro', 'Casa com barracão', '89990000');
INSERT INTO tb_address(user_id, city, logradouro, numero, bairro, complemento, cep) VALUES (2, 'Pato Branco', 'Rua Taubaté', 231, 'São Roque', 'Apartamento', '87654321');

INSERT INTO tb_order(data, user_id, address_id) VALUES ('2025-08-23T10:35:22', 1, 1);
INSERT INTO tb_order(data, user_id, address_id) VALUES ('2025-09-24T13:55:03', 2, 3);

INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (1, 2, 5, 399.90);
INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (1, 4, 2, 150.90);
INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (2, 1, 1, 249.90);
INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (2, 8, 2, 415.70);*/