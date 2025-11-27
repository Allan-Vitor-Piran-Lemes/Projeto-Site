--import.sql

insert into tb_category (id, name) values (1, 'Guerra');
insert into tb_category (id, name) values (2, 'Estratégia');
insert into tb_category (id, name) values (3, 'Cooperativo');
insert into tb_category (id, name) values (4, 'Cartas');
insert into tb_category (id, name) values (5, 'Clássicos');

insert into tb_product (id, name, description, price, category_id, url_image) values (1, 'Catan', 'Descubra tudo sobre o jogo Catan (Os Colonizadores de Catan), um dos board games mais famosos do mundo! Aprenda as regras, estratégias, expansões e curiosidades.', 249.90, 2, 'Catan.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (2, 'Azul', 'Azul é um jogo premiado onde os jogadores competem para decorar as paredes do Palácio Real de Évora com azulejos coloridos, combinando estratégia e habilidade.', 399.90, 2, 'Azul.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (3, 'Bonanza', 'Bonanza é um jogo divertido de negociação e estratégia onde os jogadores cultivam feijões para trocar e lucrar, exigindo boa comunicação e tática.', 211.99, 2, 'Bohnanza.png');

insert into tb_product (id, name, description, price, category_id, url_image) values (4, 'Certo ou Errado', 'Certo ou Errado é um jogo rápido de perguntas e respostas que testa seu conhecimento e raciocínio, perfeito para grupos e festas.', 150.90, 4, 'CertoouErrado.webp');

insert into tb_product (id, name, description, price, category_id, url_image) values (5, 'CuBirds', 'CuBirds é um jogo encantador onde os jogadores colecionam aves raras, usando estratégia e sorte para vencer.', 277.24, 4, 'CuBirds.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (6, 'Distilled', 'Distilled desafia os jogadores a criar as melhores bebidas destiladas, combinando estratégia e sorte para dominar o mercado.', 320.99, 2, 'Distilled.webp');

insert into tb_product (id, name, description, price, category_id, url_image) values (7, 'Gatinho', 'Gatinho é um jogo divertido que envolve cuidado e estratégia com gatinhos fofos para toda família.', 200.99, 3, 'Gatinho.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (8, 'Pandemic', 'Pandemic é um clássico jogo cooperativo onde os jogadores unem forças para conter epidemias que ameaçam o mundo.', 415.70, 3, 'Pandemic.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (9, 'Red7', 'Red7 é um jogo rápido e estratégico onde as regras mudam a cada rodada, exigindo adaptação constante dos jogadores.', 178.90, 4, 'Red7.webp');

insert into tb_product (id, name, description, price, category_id, url_image) values (10, 'Splendor', 'Splendor é um jogo de estratégia onde jogadores competem para coletar gemas e comprar cartas para conquistar prestígio.', 305.80, 1, 'Splendor.jpg');

insert into tb_product (id, name, description, price, category_id, url_image) values (11, 'Terra Mistica', 'Terra Mistica é um jogo de estratégia profunda onde os jogadores desenvolvem suas facções para dominar o mapa.', 860.90, 5, 'TerraMistica.webp');

insert into tb_product (id, name, description, price, category_id, url_image) values (12, 'Welcome', 'Welcome é um jogo leve e estratégico onde os jogadores desenvolvem a cidade americana ideal através de planejamento cuidadoso.', 299.90, 1, 'Welcome.jpg');


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