import authRepository from "../../DAL/authRepository.js";
import bcrypt from "bcrypt";

const authManager = {
  // add user wit haching
  register: async (username, email, password) => {
    if (!username || !email || !password) {
      throw new Error("⚠️ All fields are required");
    }

    // check if email exist
    const existing = await authRepository.findUser(email);
    if (existing) throw new Error("❌ Email already exists");

    // haching
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const id = await authRepository.createUser(username, email, hashedPassword);

    return {
      message: "✅ Registration successful!",
      user: { id, username, email },
    };
  },

  // login as user and admin
  login: async (identifier, password) => {
    if (!identifier || !password) {
      throw new Error("⚠️ Email/Username and password are required");
    }

    // find user
    let account = await authRepository.findUser(identifier);
    let role = "user";

    
    if (!account) {
      account = await authRepository.findAdmin(identifier);
      role = "admin";
    }

    if (!account) throw new Error("❌ Account not found");

    // compare password(bcrypt)
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) throw new Error("❌ Invalid password");

    // login seuccessful
    return {
      message: `✅ Login successful as ${role}`,
      role,
      user: {
        id: account.id,
        username: account.username || "Admin",
        email: account.email,
        profile_image: account.profile_image || "../Public/images/default.png",
      },
    };
  },

  // update
  updateProfile: async (id, email, password, profile_image) => {
    const hashed = password ? await bcrypt.hash(password, 10) : null;
    const success = await authRepository.updateUser(id, {
      email,
      password: hashed,
      profile_image,
    });

    if (!success) throw new Error("❌ Update failed");
    return { message: "✅ Profile updated successfully!" };
  },
};

export default authManager;
