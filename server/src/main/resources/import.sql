--import.sql

insert into tb_category (id, name) values (1, 'Guerra');
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
INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (2, 8, 2, 415.70);