import db from "./DBconnection.js";

const authRepository = {
  
  createUser: async (username, email, hashedPassword) => {
    const sql = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [username, email, hashedPassword]);
    return result.insertId;
  },

  
  findUser: async (identifier) => {
    const sql = `
      SELECT * FROM users 
      WHERE email = ? OR username = ? 
      LIMIT 1
    `;
    const [rows] = await db.query(sql, [identifier, identifier]);
    return rows[0];
  },

  
  findAdmin: async (identifier) => {
    const sql = `
      SELECT * FROM admins 
      WHERE email = ? 
      LIMIT 1
    `;
    const [rows] = await db.query(sql, [identifier]);
    return rows[0];
  },

  
  updateUser: async (id, updates) => {
    const { email, password, profile_image } = updates;
    const sql = `
      UPDATE users 
      SET 
        email = COALESCE(?, email),
        password = COALESCE(?, password),
        profile_image = COALESCE(?, profile_image)
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [email, password, profile_image, id]);
    return result.affectedRows > 0;
  },
};

export default authRepository;
