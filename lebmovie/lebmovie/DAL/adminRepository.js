import db from "./DBconnection.js";

const adminRepository = {
  
  getAdminByEmailAndPassword: async (email, password) => {
    const sql = "SELECT * FROM admins WHERE email = ? AND password = ?";
    const [rows] = await db.query(sql, [email, password]);
    return rows[0];
  },

  
  getAllMovies: async () => {
    const sql = "SELECT * FROM movies";
    const [rows] = await db.query(sql);
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
      UPDATE movies SET title=?, genre=?, year=?, image_url=?, description=? WHERE id=?
    `;
    await db.query(sql, [title, genre, year, image_url, description, id]);
  },

  
  deleteMovie: async (id) => {
    const sql = "DELETE FROM movies WHERE id = ?";
    await db.query(sql, [id]);
  }
};

export default adminRepository;
