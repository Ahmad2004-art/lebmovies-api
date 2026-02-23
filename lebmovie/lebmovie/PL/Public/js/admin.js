document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const genre = document.getElementById("genre");
  const year = document.getElementById("year");
  const image_url = document.getElementById("image_url");
  const description = document.getElementById("description");
  const addMovieBtn = document.getElementById("addMovieBtn");
  const moviesList = document.getElementById("moviesList");

  // ✅ Load all movies on start
  fetchMovies();

  // ✅ Add movie
  addMovieBtn.addEventListener("click", async () => {
    const movie = {
      title: title.value.trim(),
      genre: genre.value.trim(),
      year: year.value,
      image_url: image_url.value.trim(),
      description: description.value.trim(),
    };

    if (!movie.title) return alert("⚠️ Please enter a movie title!");

    try {
      const res = await fetch("http://localhost:4000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      const data = await res.json();
      alert(data.message);
      clearForm();
      fetchMovies();
    } catch (err) {
      alert("❌ Error connecting to server!");
      console.error(err);
    }
  });

  // ✅ Fetch all movies
  async function fetchMovies() {
    try {
      const res = await fetch("http://localhost:4000/movies");
      const movies = await res.json();
      displayMovies(movies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  }

  // ✅ Display movies in the list
  function displayMovies(movies) {
    moviesList.innerHTML = "";
    movies.forEach((m) => {
      const div = document.createElement("div");
      div.classList.add("movie-card");
      div.innerHTML = `
        <h4>${m.title} (${m.year || "N/A"})</h4>
        <p><strong>Genre:</strong> ${m.genre || "N/A"}</p>
        <p>${m.description || ""}</p>
        <button onclick="editMovie(${m.id}, '${m.title}', '${m.genre}', '${m.year}', '${m.image_url}', \`${m.description || ""}\`)">✏️ Edit</button>
        <button onclick="deleteMovie(${m.id})">🗑️ Delete</button>
      `;
      moviesList.appendChild(div);
    });
  }

  // ✅ Clear input fields
  function clearForm() {
    title.value = "";
    genre.value = "";
    year.value = "";
    image_url.value = "";
    description.value = "";
  }

  // ✅ Delete movie
  window.deleteMovie = async (id) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;
    try {
      const res = await fetch(`http://localhost:4000/movies/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      fetchMovies();
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  // ✅ Edit movie
  window.editMovie = (id, titleText, genreText, yearText, imgUrl, desc) => {
    title.value = titleText;
    genre.value = genreText;
    year.value = yearText;
    image_url.value = imgUrl;
    description.value = desc;

    addMovieBtn.textContent = "Update Movie";
    addMovieBtn.onclick = async () => {
      const updatedMovie = {
        title: title.value.trim(),
        genre: genre.value.trim(),
        year: year.value,
        image_url: image_url.value.trim(),
        description: description.value.trim(),
      };

      try {
        const res = await fetch(`http://localhost:4000/movies/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMovie),
        });
        const data = await res.json();
        alert(data.message);
        addMovieBtn.textContent = "Add Movie";
        addMovieBtn.onclick = null;
        clearForm();
        fetchMovies();
      } catch (err) {
        console.error("Error updating movie:", err);
      }
    };
  };
});
