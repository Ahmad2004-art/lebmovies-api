import db from "./DBconnection.js";

const moviesRepository = {
  
  getAllMovies: async () => {
    const [rows] = await db.query("SELECT * FROM movies");
    return rows;
  },

  
  addMovie: async (title, genre, year, image_url, description) => {
    const sql = `
      INSERT INTO movies (title, genre, year, image_url, description)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [title, genre, year, image_url, description]);
    return result.insertId;
  },

  
  updateMovie: async (id, title, genre, year, image_url, description) => {
    const sql = `
      UPDATE movies
      SET title=?, genre=?, year=?, image_url=?, description=?
      WHERE id=?
    `;
    await db.query(sql, [title, genre, year, image_url, description, id]);
  },

  
  deleteMovie: async (id) => {
    await db.query("DELETE FROM movies WHERE id = ?", [id]);
  },
};

export default moviesRepository;
