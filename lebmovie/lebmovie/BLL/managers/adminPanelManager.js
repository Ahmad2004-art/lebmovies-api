import adminPanelRepository from "../../DAL/adminPanelRepository.js";
import bcrypt from "bcrypt";

const adminPanelManager = {
  // ✅ get all info
  getAll: async (type) => {
    const table = getTable(type);
    return await adminPanelRepository.getAll(table);
  },

  // ✅ get one ifo by id
  getById: async (type, id) => {
    const table = getTable(type);
    return await adminPanelRepository.getById(table, id);
  },

  // ✅ add user or admin with haching movie
  create: async (type, username, email, password) => {
    if (!username || !email || !password) throw new Error("⚠️ Missing fields");
    const table = getTable(type);
    const hashed = await bcrypt.hash(password, 10);
    const id = await adminPanelRepository.create(table, username, email, hashed);
    return { id, username, email };
  },

  // ✅updaye admin
  update: async (type, id, username, email, password) => {
    const table = getTable(type);
    const hashed = await bcrypt.hash(password, 10);
    await adminPanelRepository.update(table, id, username, email, hashed);
  },

  // ✅ delete user
  delete: async (type, id) => {
    const table = getTable(type);
    await adminPanelRepository.delete(table, id);
  },
};

// 🧩 table of user and admin
function getTable(type) {
  if (type === "users") return "users";
  if (type === "admins") return "admins";
  throw new Error("Invalid type");
}

export default adminPanelManager;
