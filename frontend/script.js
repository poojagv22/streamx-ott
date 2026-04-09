const API_KEY = "7cd080296d71e69ced686c58a3687026"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// FETCH TRENDING MOVIES
async function getMovies() {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();

    displayMovies(data.results);
    setHero(data.results[0]);
    loadCarousel(data.results.slice(0, 5));

  } catch (error) {
    console.log("Error fetching movies:", error);
  }
}

// DISPLAY MOVIES
function displayMovies(movies) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  movies.forEach(movie => {
    const img = document.createElement("img");
    img.src = IMG_URL + movie.poster_path;
    img.title = movie.title;

    // 🔥 CLICK EVENT
    img.onclick = () => openModal(movie);

    container.appendChild(img);
  });
}

window.onclick = function (event) {
  const modal = document.getElementById("movieModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Existing code
function toggleTheme() {
  document.body.classList.toggle("light");
}

// INIT
getMovies();


// 🔥 ADD BELOW THIS (at the end of file)

function openModal(movie) {
  document.getElementById("movieModal").style.display = "block";

  document.getElementById("modal-img").src =
    "https://image.tmdb.org/t/p/w300" + movie.poster_path;

  document.getElementById("modal-title").innerText = movie.title;

  document.getElementById("modal-rating").innerText =
    "⭐ " + movie.vote_average.toFixed(1) + " / 10";

  document.getElementById("modal-desc").innerText =
    movie.overview || "No description available";

  document.getElementById("playTrailer").onclick = () => {
  playTrailer(movie.id);
};

// clear old trailer
document.getElementById("trailer").innerHTML = "";
}

function closeModal() {
  document.getElementById("movieModal").style.display = "none";

  // 🔥 STOP VIDEO
  document.getElementById("trailer").innerHTML = "";
}

// HERO SECTION
function setHero(movie) {
  document.getElementById("hero-title").innerText = movie.title;
  document.getElementById("hero-desc").innerText = movie.overview;

  document.getElementById("hero").style.backgroundImage =
    `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
}

// CAROUSEL
let currentSlide = 0;

function loadCarousel(movies) {
  const slides = document.getElementById("slides");
  slides.innerHTML = "";

  movies.forEach(movie => {
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    slides.appendChild(img);
  });

  autoSlide();
}

function autoSlide() {
  const slides = document.getElementById("slides");

  setInterval(() => {
    currentSlide++;
    if (currentSlide >= slides.children.length) {
      currentSlide = 0;
    }
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  }, 3000);
}

// SEARCH MOVIES
async function searchMovies() {
  const query = document.getElementById("search").value;

  if (query.length < 3) {
    getMovies();
    return;
  }

  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();

  displayMovies(data.results);
}

// DARK MODE
function toggleTheme() {
  document.body.classList.toggle("light");
}

async function playTrailer(movieId) {
  const trailerDiv = document.getElementById("trailer");

  // 🔥 show loading first
  trailerDiv.innerHTML = "Loading...";

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();

  const trailer = data.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  if (trailer) {
    trailerDiv.innerHTML = `
      <iframe 
        width="100%" 
        height="300" 
        src="https://www.youtube.com/embed/${trailer.key}" 
        frameborder="0" 
        allowfullscreen>
      </iframe>
    `;

    // 🔥 IMPORTANT: delay scroll
  // 🔥 scroll inside modal
setTimeout(() => {
  const modalContent = document.querySelector(".modal-content");

  modalContent.scrollTo({
    top: modalContent.scrollHeight,
    behavior: "smooth"
  });
}, 300);


  } else {
    trailerDiv.innerHTML = "<p>No trailer available</p>";
  }
}

// INIT
getMovies();