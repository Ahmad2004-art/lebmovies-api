document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("moviesGrid");
  const noMovies = document.getElementById("noMovies");
const userData = JSON.parse(localStorage.getItem("userData") || "{}");

if (!userData || !userData.email || !userData.role) {
    // save the reason 
    localStorage.setItem("redirectReason", "loginRequiredMovies");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/movies");
    const movies = await res.json();

    if (!Array.isArray(movies) || movies.length === 0) {
      noMovies.style.display = "block";
      return;
    }

    grid.innerHTML = "";

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <div class="play-overlay">
          <i class="fa fa-play-circle"></i>
        </div>
        <img src="${movie.image_url || '../public/images/th (2).jpeg'}" alt="${movie.title}">
        <div class="movie-info">
          <h2>${movie.title}</h2>
          <p>${movie.genre || "Unknown"} • ${movie.year || "N/A"}</p>
          <p>${movie.description ? movie.description.substring(0, 80) + "..." : ""}</p>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error("❌ Error fetching movies:", error);
    noMovies.style.display = "block";
    noMovies.textContent = "Error loading movies ❌";
  }
});
