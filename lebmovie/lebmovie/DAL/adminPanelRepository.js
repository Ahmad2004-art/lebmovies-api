import db from "./DBconnection.js";

const adminPanelRepository = {
  
  getAll: async (table) => {
    const [rows] = await db.query(`SELECT id, username, email FROM ${table}`);
    return rows;
  },

  
  getById: async (table, id) => {
    const [rows] = await db.query(`SELECT id, username, email FROM ${table} WHERE id = ?`, [id]);
    return rows[0];
  },

  
  create: async (table, username, email, password) => {
    const [result] = await db.query(
      `INSERT INTO ${table} (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );
    return result.insertId;
  },

  
  update: async (table, id, username, email, password) => {
    await db.query(
      `UPDATE ${table} SET username = ?, email = ?, password = ? WHERE id = ?`,
      [username, email, password, id]
    );
  },

  
  delete: async (table, id) => {
    await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
  },
};

export default adminPanelRepository;
