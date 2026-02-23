import db from "./DBconnection.js";

const contactRepository = {
  createMessage: async (name, email, message, image_url) => {
    await db.query(
      "INSERT INTO contact_messages (name, email, message, image_url) VALUES (?, ?, ?, ?)",
      [name, email, message, image_url]
    );
  },

  getAllMessages: async () => {
    const [rows] = await db.query(
      "SELECT id, name, email, message, image_url, created_at FROM contact_messages ORDER BY created_at DESC"
    );
    return rows;
  },

  deleteMessage: async (id) => {
    await db.query("DELETE FROM contact_messages WHERE id = ?", [id]);
  },
};

export default contactRepository;
