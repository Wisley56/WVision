import { Session } from "../models/session.js";

let successModal;

document.addEventListener("DOMContentLoaded", () => {
  const movieSelect = document.getElementById("movie");
  const roomSelect = document.getElementById("room");
  const form = document.getElementById("sessionForm");

  const successModalEl = document.getElementById("successModal");
  successModal = new bootstrap.Modal(successModalEl);

  loadMovies();
  loadRooms();

  $(movieSelect).select2({
    templateResult: formatMovieOption,
    templateSelection: formatMovieOption,
    width: '100%'
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const session = new Session(
      Date.now(),
      movieSelect.value,
      roomSelect.value,
      document.getElementById("datetime").value,
      parseFloat(document.getElementById("price").value),
      document.getElementById("language").value,
      document.getElementById("format").value
    );

    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    sessions.push(session);
    localStorage.setItem("sessions", JSON.stringify(sessions));

    successModal.show();
    form.reset();
    $(movieSelect).val(null).trigger("change");
  });
});

function loadMovies() {
  const movieSelect = document.getElementById("movie");
  const movies = JSON.parse(localStorage.getItem("userMovies") || "[]");

  movies.forEach(movie => {
    const option = document.createElement("option");
    option.value = movie.id;
    option.textContent = movie.title;
    option.setAttribute("data-image", movie.image || "../img/image_default.png");
    movieSelect.appendChild(option);
  });
}

function loadRooms() {
  const roomSelect = document.getElementById("room");
  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

  rooms.forEach(room => {
    const option = document.createElement("option");
    option.value = room.id;
    option.textContent = `${room.name} - ${room.type}`;
    roomSelect.appendChild(option);
  });
}

function formatMovieOption(movie) {
  if (!movie.id) return movie.text;
  const img = $(movie.element).data("image");
  return $(`<span><img src="${img}" /> ${movie.text}</span>`);
}
