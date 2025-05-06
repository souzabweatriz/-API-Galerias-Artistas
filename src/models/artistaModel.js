const pool = require("../config/database");

const getArtistas = async () => {
    const result = await pool.query('SELECT * FROM artistas');
    return result.rows;
};

const getArtistaById = async (id) => {
    const result = await pool.query("SELECT * FROM artistas WHERE id = $1", [id]);
    return result.rows[0];
};

const createArtista = async (nome, obraPrincipal, galeria_id) => {
    const result = await pool.query(
        "INSERT INTO artistas (nome, obraPrincipal, galeria_id) VALUES ($1, $2, $3) RETURNING *",
        [nome, obraPrincipal, galeria_id]
    );
    return result.rows[0];
};

const updateArtista = async (id, nome, obraPrincipal, galeria_id) => {
    const result = await pool.query(
        "UPDATE artistas SET nome = $1, obraPrincipal = $2, galeria_id = $3 WHERE id = $4 RETURNING *",
        [nome, obraPrincipal, galeria_id, id]
    );
    return result.rows[0];
};

const deleteArtista = async (id) => {
    const result = await pool.query("DELETE FROM artistas WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Artista não encontrado." };
    }

    return { message: "Artista deletado com sucesso." };
};

module.exports = { getArtistaById, getArtistas, createArtista, updateArtista, deleteArtista };
