import contactRepository from "../../DAL/contactRepository.js";

const contactManager = {
  createMessage: async (name, email, message, image_url) => {
    if (!name || !email || !message)
      throw new Error("⚠️ All fields are required");

    const finalImage = image_url || "/Public/images/contact-default.jpg";
    await contactRepository.createMessage(name, email, message, finalImage);
    return { message: "✅ Message saved successfully" };
  },

  getAllMessages: async () => {
    return await contactRepository.getAllMessages();
  },

  deleteMessage: async (id) => {
    if (!id) throw new Error("⚠️ Missing message ID");
    await contactRepository.deleteMessage(id);
    return { message: "🗑️ Message deleted successfully" };
  },
};

export default contactManager;
