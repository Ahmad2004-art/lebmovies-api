// BLL/managers/profileManager.js
import bcrypt from "bcrypt";
import profileRepository from "../../DAL/profileRepository.js";

const profileManager = {
  getProfile: async (id) => {
    const user = await profileRepository.getUserById(id);
    if (!user) throw new Error("❌ User not found");
    return user;
  },

  updateProfile: async (id, email, password, profile_image) => {
    if (!id) throw new Error("⚠️ Missing user ID");

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updated = await profileRepository.updateUserProfile(
      id,
      email,
      hashedPassword,
      profile_image
    );

    if (!updated) throw new Error("❌ No fields updated or user not found");

    const user = await profileRepository.getUserById(id);
    return { message: "✅ Profile updated successfully!", user };
  },
};

export default profileManager;
