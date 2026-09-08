CREATE DATABASE IF NOT EXISTS ligamagic_desafio;
USE ligamagic_desafio;

CREATE TABLE IF NOT EXISTS users(
    id PRIMARY KEY INT AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS cards(
    id PRIMARY KEY INT AUTO_INCREMENT,
    en_name VARCHAR(100) NOT NULL,
    pt_name VARCHAR(100),
    card_game VARCHAR(50) NOT NULL,
    game_edition VARCHAR(50) NOT NULL,
    img LONGBLOB NOT NULL,
    rarity VARCHAR(100) NOT NULL
);

INSERT INTO cards (en_name, pt_name, card_game, game_edition, img, rarity)
VALUES
("Lucario", "Lucario em Pt-BR", "Pokémon", "Sword & Shield", "imagemaaaaaaa", "Rara"),
("Cutiefly", "Cutiefly em Pt-BR", "Pokémon", "Sword & Shield", "umaimagem", "Super Rara"),
("Audino", "Audino em Pt-BR", "Pokémon", "Sword & Shield", "helloooooimg", "Comum");
