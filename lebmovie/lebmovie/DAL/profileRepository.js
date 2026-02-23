import db from "./DBconnection.js";

const profileRepository = {
  getUserById: async (id) => {
    const sql = "SELECT id, username, email, profile_image FROM users WHERE id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  updateUserProfile: async (id, email, hashedPassword, profile_image) => {
    let fields = [];
    let values = [];

    if (email) {
      fields.push("email = ?");
      values.push(email);
    }

    if (hashedPassword) {
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    if (profile_image) {
      fields.push("profile_image = ?");
      values.push(profile_image);
    }

    if (fields.length === 0) return false;

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const [result] = await db.query(sql, values);
    return result.affectedRows > 0;
  },
};

export default profileRepository;
