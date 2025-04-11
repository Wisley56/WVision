import { Movie } from "../models/movie.js";

// Mock: Filmes populares, lançamentos e por gênero (normalmente viria de uma API ou JSON externo)
const releaseMovies = [
  { id: 101, title: "Matrix", description: "Ficção científica", genre: "Ficção Científica", image: "../img/release_movies/matrix_resurrections.png" },
  { id: 102, title: "Interestelar", description: "Uma jornada através do espaço e do tempo.", genre: "Ficção Científica", image: "../img/release_movies/capa_interestelar.jpg" },
  { id: 103, title: "O Predestinado", description: "Um agente viaja no tempo para impedir crimes.", genre: "Ficção Científica", image: "../img/release_movies/O-predestinado-Foto-Divulgacao.png" },
  { id: 104, title: "Gravidade", description: "Astronautas lutam pela sobrevivência no espaço.", genre: "Ficção Científica", image: "../img/release_movies/Gravity.jpg" },
  { id: 105, title: "Duna", description: "Um épico futurista no planeta deserto Arrakis.", genre: "Ficção Científica", image: "../img/release_movies/dune.png" },
  { id: 106, title: "Tenet", description: "Espionagem e manipulação do tempo.", genre: "Ficção Científica", image: "../img/release_movies/tenet.png" },
  { id: 107, title: "A Origem", description: "Uma missão nos sonhos das pessoas.", genre: "Ficção Científica", image: "../img/release_movies/a_origem.jpg" },
  { id: 108, title: "Ex Machina", description: "A inteligência artificial coloca tudo em risco.", genre: "Ficção Científica", image: "../img/release_movies/ex_machine.jpg" },
  { id: 109, title: "Ad Astra", description: "Um astronauta em busca do pai desaparecido.", genre: "Ficção Científica", image: "../img/release_movies/ad_astra.jpg" },
  { id: 110, title: "O Jogo da Imitação", description: "Ciência e guerra na mente de Alan Turing.", genre: "Ficção Científica", image: "../img/release_movies/o_jogo_da_imitacão.jpg" }
];

const popularMovies = [
  { id: 201, title: "Titanic", description: "Romance dramático", genre: "Romance", image: "../img/popular_movies/titanic.png" },
  { id: 202, title: "Orgulho e Preconceito", description: "O amor desafia as convenções sociais.", genre: "Romance", image: "../img/popular_movies/orgulho_preconceito.png" },
  { id: 203, title: "Simplesmente Acontece", description: "Uma amizade marcada por desencontros.", genre: "Romance", image: "../img/popular_movies/simplesmente_acontece.jpg" },
  { id: 204, title: "Diário de uma Paixão", description: "Uma história de amor que desafia o tempo.", genre: "Romance", image: "../img/popular_movies/diario_de_uma_paixao.png" },
  { id: 205, title: "Como Eu Era Antes de Você", description: "Um amor transformador e delicado.", genre: "Romance", image: "../img/popular_movies/como-eu-era-antes-de-voce-minha-vida-literaria-banner.jpg" },
  { id: 206, title: "Querido John", description: "Amor à distância e promessas eternas.", genre: "Romance", image: "../img/popular_movies/querido_john.jpg" },
  { id: 207, title: "PS: Eu Te Amo", description: "Cartas de amor além da vida.", genre: "Romance", image: "../img/popular_movies/ps-eu-te-amo-poster.jpg" },
  { id: 208, title: "Um Dia", description: "Um casal se encontra no mesmo dia a cada ano.", genre: "Romance", image: "../img/popular_movies/um-dia.jpg" },
  { id: 209, title: "A Culpa é das Estrelas", description: "Um romance marcado por superação e dor.", genre: "Romance", image: "../img/popular_movies/a_culpa_e_das_estrelas.png" }
];

let movieIdToDelete = null;

// LocalStorage
function getUserMovies() {
  const data = JSON.parse(localStorage.getItem("userMovies") || "[]");
  return data.map(m => new Movie(m.id, m.title, m.genre, m.classification, m.description, m.duration, m.premiereDate, m.image));
}

function deleteUserMovie(id) {
  const movies = getUserMovies().filter(movie => movie.id !== id);
  localStorage.setItem("userMovies", JSON.stringify(movies));
  renderAllCarousels();
}

function renderCarousel(containerId, movies, showEdit = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  movies.forEach((movie, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

    const card = document.createElement("div");
    card.className = "card bg-dark text-white border-0";

    const img = document.createElement("img");
    img.src = movie.image;
    img.className = "d-block w-100";
    img.alt = movie.title;
    img.style = "max-height: 300px; object-fit: cover;";

    const body = document.createElement("div");
    body.className = "card-body bg-dark";

    const title = document.createElement("h5");
    title.className = "card-title text-white";
    title.textContent = movie.title;

    const desc = document.createElement("p");
    desc.className = "card-text text-white";
    desc.textContent = movie.description;

    body.appendChild(title);
    body.appendChild(desc);

    if (showEdit) {
      const btnGroup = document.createElement("div");
      btnGroup.className = "d-flex gap-2";

      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-sm btn-warning";
      editBtn.innerHTML = '<i class="bi bi-pencil"></i> Editar';
      editBtn.addEventListener("click", () => editMovie(movie.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-sm btn-danger";
      deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Excluir';
      deleteBtn.addEventListener("click", () => {
        movieIdToDelete = movie.id;
        confirmDeleteModal.show();
      });

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(deleteBtn);
      body.appendChild(btnGroup);
    }

    card.appendChild(img);
    card.appendChild(body);
    carouselItem.appendChild(card);
    container.appendChild(carouselItem);
  });
}

function renderAllCarousels() {
  renderCarousel("releases-cards", releaseMovies);
  renderCarousel("popular-cards", popularMovies);
  renderCarousel("user-cards", getUserMovies(), true);
}

// Modal de Cadastro/Edição
const form = document.getElementById("formFilm");
const btnAdd = document.getElementById("btnAddFilme");
const modalElement = document.getElementById("modalFilm");
let modalInstance = null;

// Modal de confirmação de exclusão
const confirmDeleteModalEl = document.getElementById("confirmDeleteModal");
const confirmDeleteModal = new bootstrap.Modal(confirmDeleteModalEl);
const btnConfirmDelete = document.getElementById("btnConfirmDelete");

btnConfirmDelete.addEventListener("click", () => {
  if (movieIdToDelete !== null) {
    deleteUserMovie(movieIdToDelete);
    movieIdToDelete = null;
    confirmDeleteModal.hide();
  }
});

if (bootstrap && bootstrap.Modal) {
  modalInstance = new bootstrap.Modal(modalElement);
}

const previewImage = document.getElementById("previewImagem");
const previewContainer = document.getElementById("previewContainer");
const modalTitle = document.getElementById("modalFilmLabel");

btnAdd.addEventListener("click", () => {
  form.reset();
  document.getElementById("filmId").value = "";
  modalTitle.textContent = "Cadastrar Filme";
  previewContainer.style.display = "none";
  previewImage.removeAttribute("src");
  modalInstance.show();
});

form.movieImage.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewContainer.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("filmId").value || Date.now();
  const title = form.title.value;
  const description = form.description.value;
  const genre = form.genre.value;
  const classification = form.classification.value;
  const duration = form.duration.value;
  const premiereDate = form.premiereDate.value;

  const defaultImagePath = "../img/image_default.png";
  const isImageValid = previewImage.hasAttribute("src") &&
    previewImage.src !== "" &&
    !previewImage.src.endsWith(".html") &&
    !previewImage.src.includes("about:blank") &&
    !previewImage.src.includes("#");

  const image = isImageValid ? previewImage.src : defaultImagePath;

  const movie = new Movie(id, title, genre, classification, description, duration, premiereDate, image);

  let movies = getUserMovies();
  const index = movies.findIndex(f => f.id == id);

  if (index !== -1) {
    movies[index] = movie;
  } else {
    movies.push(movie);
  }

  localStorage.setItem("userMovies", JSON.stringify(movies));
  modalInstance.hide();
  renderAllCarousels();
});

function editMovie(id) {
  const movie = getUserMovies().find(f => f.id === id);
  if (!movie) return;

  document.getElementById("filmId").value = movie.id;
  form.title.value = movie.title;
  form.description.value = movie.description;
  form.genre.value = movie.genre;
  form.classification.value = movie.classification;
  form.duration.value = movie.duration;
  form.premiereDate.value = movie.premiereDate;
  previewImage.src = movie.image;
  previewContainer.style.display = "block";

  modalTitle.textContent = "Editar Filme";
  modalInstance.show();
}

// Inicialização
renderAllCarousels();
