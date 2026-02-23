import db from "./DBconnection.js";

const contactAdminRepository = {
  // ✅ جلب جميع الرسائل
  getAllMessages: async () => {
    const [rows] = await db.query(`
      SELECT c.id, c.name, c.email, c.message, c.image_url, c.created_at,
      (SELECT reply_text FROM contact_replies r WHERE r.message_id = c.id ORDER BY r.created_at DESC LIMIT 1) AS last_reply
      FROM contact_messages c
      ORDER BY c.created_at DESC
    `);
    return rows;
  },

  // ✅ حذف رسالة
  deleteMessage: async (id) => {
    await db.query("DELETE FROM contact_messages WHERE id = ?", [id]);
  },

  // ✅ إرسال رد
  sendReply: async (message_id, admin_email, reply_text) => {
    await db.query(
      "INSERT INTO contact_replies (message_id, admin_email, reply_text) VALUES (?, ?, ?)",
      [message_id, admin_email, reply_text]
    );
  },
};

export default contactAdminRepository;
