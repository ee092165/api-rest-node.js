CREATE DATABASE IF NOT EXISTS dev_db
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

USE dev_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

INSERT INTO usuarios (nome, email) VALUES
('Nome 1', 'nome1@dominio.com'),
('Nome 2', 'nome2@dominio.com'),
('Nome 3', 'nome3@dominio.com'),
('Nome 4', 'nome4@dominio.com');