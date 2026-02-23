// BLL/managers/userManager.js
import userRepository from "../../DAL/userRepository.js";

const userManager = {
  // ✅ Register User
  register: async (username, email, password) => {
    if (!username || !email || !password) {
      throw new Error("⚠️ All fields are required");
    }

    // 🔍 Check if email or username already exists
    const existingUser = await userRepository.getUserByEmailOrUsername(email);
    if (existingUser) {
      throw new Error("❌ Email already exists");
    }

    // 🆕 Register user
    const id = await userRepository.registerUser(username, email, password);
    return {
      message: "✅ Registration successful!",
      user: { id, username, email },
    };
  },

  // ✅ Login User
  login: async (identifier, password) => {
    if (!identifier || !password) {
      throw new Error("⚠️ Email/Username and password are required");
    }

    // 🔍 Get user by email or username
    const user = await userRepository.getUserByEmailOrUsername(identifier);
    console.log("DEBUG: user found in DB →", user); // debug message in console

    if (!user) {
      throw new Error("❌ User not found");
    }

    // ❌ Invalid password
    if (user.password !== password) {
      throw new Error("❌ Invalid password");
    }

    // ✅ Successful login
    return {
      message: "✅ Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  },
};

export default userManager;
