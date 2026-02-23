import db from "./DBconnection.js";

const userRepository = {
  registerUser: async (username, email, password) => {
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [username, email, password]);
    return result.insertId;
  },

  getUserByEmailOrUsername: async (identifier) => {
    const sql = "SELECT * FROM users WHERE email = ? OR username = ?";
    const [rows] = await db.query(sql, [identifier, identifier]);
    return rows[0];
  },
};

export default userRepository;
