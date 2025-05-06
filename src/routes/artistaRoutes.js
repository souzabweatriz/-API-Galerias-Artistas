const express = require("express");
const router = express.Router();
const artistaModel = require("../models/artistaModel.js")
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);
router.get("/artistas", artistaModel.getArtistas);
router.get("/artistas/:id", artistaModel.getArtistaById);
router.post("/artistas",  artistaModel.createArtista);
router.put("/artistas/:id", artistaModel.updateArtista);
router.delete("/artistas/:id", artistaModel.deleteArtista);

module.exports = router;