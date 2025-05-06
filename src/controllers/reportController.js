const PDFDocument = require("pdfkit");

const galeriaModel = require("../models/galeriaModel");

const exportGaleriaPDF = async (req, res) => {
    try {
        
        const galerias = await galeriaModel.getGalerias()

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=galerias.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

        //Titulo
        doc.fontSize(20).text("Relatorio de Galerias", { align: "center" });
        doc.moveDown();

        //Cabeçalho
        doc.fontSize(12).text("Id | nome | endereço", { underline: true });
        doc.moveDown(0.5);

         //Add dados dos Cosméticos
        galerias.forEach((galeria) => {
            doc.text(
                `${galeria.id} | ${galeria.nome} |  ${galeria.endereco}`
            );
        });

        doc.end();

    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF"}); 
    }
};

module.exports = {exportGaleriaPDF};