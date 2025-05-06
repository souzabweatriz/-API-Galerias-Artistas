const pool = require("../config/database");

const getGalerias = async () => {
    const result = await pool.query('SELECT * FROM galerias');
    return result.rows;
};

const getGaleriaById = async (id) => {
    const result = await pool.query('SELECT * FROM galerias WHERE id = $1', [id]
    );
    return result.rows[0];
};

const createGaleria = async (nome, endereco, photo) =>{
    const result = await pool.query(
        'INSERT INTO galerias (nome, endereco, photo) VALUES ($1, $2, $3) RETURNING*', [nome, endereco, photo]
    );
    return result.rows[0];
};  //COM FOTO!!

const updateGaleria = async (id, nome, endereco) => {
    const result = await pool.query(
        'UPDATE galerias SET nome = $1, endereco = $2 WHERE id = $3 RETURNING*',
    [nome, endereco, id]
    );
    return result.rows[0];
};

const deleteGaleria = async (id) => {
    const result = await pool.query('DELETE FROM galerias WHERE id = $1 RETURNING*', [id]

    );
    if (result.rowCount === 0) {
        return { error: "Galeria não encontrada" };
    }

    return { message: "Galeria deletada com sucesso" };
};

module.exports = { getGalerias, getGaleriaById, createGaleria, updateGaleria, deleteGaleria}