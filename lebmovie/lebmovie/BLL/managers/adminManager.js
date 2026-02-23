// BLL/managers/adminManager.js
import adminRepository from "../../DAL/adminRepository.js";

const adminManager = {
  // ✅ admin login
  login: async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");

    const admin = await adminRepository.getAdminByEmailAndPassword(email, password);
    if (!admin) throw new Error("Invalid admin credentials");

    return { id: admin.id, email: admin.email };
  },

  // ✅ get all movies
  getMovies: async () => {
    return await adminRepository.getAllMovies();
  },

  // ✅ add movies
  addMovie: async (movieData) => {
    const { title, genre, year, image_url, description } = movieData;
    if (!title) throw new Error("Title is required");
    const id = await adminRepository.addMovie(title, genre, year, image_url, description);
    return id;
  },

  // ✅ update movie
  updateMovie: async (id, movieData) => {
    const { title, genre, year, image_url, description } = movieData;
    await adminRepository.updateMovie(id, title, genre, year, image_url, description);
  },

  // ✅ delete movie
  deleteMovie: async (id) => {
    await adminRepository.deleteMovie(id);
  }
};

export default adminManager;
