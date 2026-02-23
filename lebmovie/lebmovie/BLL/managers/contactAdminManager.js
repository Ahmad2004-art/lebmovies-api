import contactAdminRepository from "../../DAL/contactAdminRepository.js";

const contactAdminManager = {
  getAllMessages: async () => {
    return await contactAdminRepository.getAllMessages();
  },

  deleteMessage: async (id) => {
    if (!id) throw new Error("Missing message ID");
    await contactAdminRepository.deleteMessage(id);
  },

  sendReply: async (message_id, admin_email, reply_text) => {
    if (!message_id || !admin_email || !reply_text)
      throw new Error("All fields are required to send a reply");
    await contactAdminRepository.sendReply(message_id, admin_email, reply_text);
  },
};

export default contactAdminManager;
