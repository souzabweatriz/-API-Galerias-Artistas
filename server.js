require("dotenv").config();
const express = require("express");
const cors = require("cors");
const galeriaRoutes = require("./src/routes/galeriaRoutes");
const path = require("path");
const reportRoutes = require("./src/routes/reportRoutes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", reportRoutes);
app.use("/api", galeriaRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
