import moviesRepository from "../../DAL/moviesRepository.js";

const moviesManager = {
  // get all movies
  getAll: async () => {
    return await moviesRepository.getAllMovies();
  },

  
  add: async (data) => {
    const { title, genre, year, image_url, description } = data;
    if (!title) throw new Error("Title is required");
    const id = await moviesRepository.addMovie(title, genre, year, image_url, description);
    return id;
  },

  
  update: async (id, data) => {
    const { title, genre, year, image_url, description } = data;
    await moviesRepository.updateMovie(id, title, genre, year, image_url, description);
  },

  
  remove: async (id) => {
    await moviesRepository.deleteMovie(id);
  },
};

export default moviesManager;
