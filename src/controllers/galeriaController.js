const galeriaModel = require("../models/galeriaModel")

const getAllGalerias = async (req, res) => {
    try {
        const nome = req.query.nome;
        const galerias = await galeriaModel.getGalerias(nome);
        res.json(galerias);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao buscar Galerias' });
    }
};

const getGaleriaById = async (req, res) => {
    try {
        const galerias = await galeriaModel.getGaleriaById(req.params.id);
        if (!galerias) {
            return res.status(404).json({ message: "Galeria não encontrada!" });
        }
        res.json(galerias);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Galeria" });
    }
};

const createGaleria = async (req, res) => {
    try {
        const { nome, endereco } = req.body;
        const photo = req.file ? req.file.filename : null;
        const newGaleria = await galeriaModel.createGaleria(nome, endereco, photo);
        res.status(201).json(newGaleria);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return res.status(400).json({ message: "Galeria já existente!" });
        }
        res.status(500).json({ message: "Erro ao criar Galeria" });
    }
};

const updateGaleria = async (req, res) => {
    try {
        const { nome, endereco } = req.body;
        const updatedGaleria = await galeriaModel.updateGaleria(req.params.id, nome, endereco);
        if (!updatedGaleria) {
            return res.status(404).json({ message: "Galeria não encontrada!" });
        }
        res.json(updatedGaleria);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar Galeria!" });
    }
}; 

const deleteGaleria = async (req, res) => {
    try {
        const message = await galeriaModel.deleteGaleria(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar Galeria." });
    }
};

module.exports = {getAllGalerias, getGaleriaById, updateGaleria, deleteGaleria, createGaleria}