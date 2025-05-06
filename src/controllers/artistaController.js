const artistaModel = require("../models/artistaModel");

const getAllArtistas = async (req, res) => {
    try {
        const artistas = await artistaModel.getArtistas();
        res.json(artistas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar artistas." });
    }
};

const getArtistaById = async (req, res) => {
    try {
        const artista = await artistaModel.getArtistaById(req.params.id);
        if (!artista) {
            return res.status(404).json({ message: "Artista não encontrado." });
        }
        res.json(artista);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar artista." });
    }
};

const createArtista = async (req, res) => {
    try {
        const { nome, obraPrincipal, galeria_id } = req.body;
        const newArtista = await artistaModel.createArtista(nome, obraPrincipal, galeria_id);
        res.status(201).json(newArtista);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") { // Código do PostgreSQL para chave única
            return res.status(400).json({ message: "Artista já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar artista." });
    }
};

const updateArtista = async (req, res) => {
    try {
        const { nome, obraPrincipal, galeria_id } = req.body;
        const updatedArtista = await artistaModel.updateArtista(req.params.id, nome, obraPrincipal, galeria_id);
        if (!updatedArtista) {
            return res.status(404).json({ message: "Artista não encontrado." });
        }
        res.json(updatedArtista);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar artista." });
    }
};

const deleteArtista = async (req, res) => {
    try {
        const message = await artistaModel.deleteArtista(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar artista." });
    }
};

module.exports = {
    getAllArtistas,
    getArtistaById,
    createArtista,
    updateArtista,
    deleteArtista
};
