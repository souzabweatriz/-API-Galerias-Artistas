const express = require("express");
const router = express.Router();
const galeriaModel = require("../controllers/galeriaController");
const apiKeyMiddleware = require("../config/apiKey");
const upload = require("../config/upload.js"); // importe a upload.js
const galeriaController = require("../controllers/galeriaController.js"); //importe o controller



router.use(apiKeyMiddleware);
router.get("/galerias", galeriaModel.getAllGalerias);
router.get("/galerias/:id", galeriaModel.getGaleriaById);
router.post("/galerias", upload.single("photo"), galeriaController.createGaleria);
router.put("/galerias/:id", galeriaModel.updateGaleria);
router.delete("/galerias/:id", galeriaModel.deleteGaleria);

module.exports = router;