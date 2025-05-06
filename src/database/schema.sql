CREATE DATABASE galeriaarte;

\c galeriaarte

CREATE TABLE galerias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(100)
);

ALTER TABLE galerias ADD COLUMN photo TEXT;

SELECT * FROM galerias;

CREATE TABLE artistas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    obraPrincipal VARCHAR(90),
    galeria_id INT REFERENCES galerias(id) ON DELETE CASCADE
);

SELECT * FROM artistas;

INSERT INTO galerias (nome, endereco) VALUES
('Galeria Nacional de Arte', 'Praça da República, 123, São Paulo, SP'),
('Espaço Cultural Contemporâneo', 'Av. das Nações, 456, Brasília, DF'),
('Galeria Arte Moderna', 'Rua das Flores, 789, Rio de Janeiro, RJ'),
('Museu da Arte Brasileira', 'Alameda das Palmeiras, 101, Curitiba, PR'),
('Estúdio de Arte e Design', 'Rua do Sol, 202, Salvador, BA');


INSERT INTO artistas (nome, obraPrincipal, galeria_id) VALUES
('Tarsila do Amaral', 'Abaporu', 1),
('Candido Portinari', 'Guerra e Paz', 2),
('Anita Malfatti', 'A Mulher de Cabelos Verdes', 3),
('Vicente do Rego Monteiro', 'A Epopeia dos Andes', 4),
('Lygia Clark', 'Bicho', 5);

