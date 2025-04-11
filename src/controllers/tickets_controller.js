    import { Ticket } from "../models/tickets.js";

    let successModal;

    document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ticketForm");
    const sessionSelect = document.getElementById("session");

    const successModalEl = document.getElementById("successModal");
    successModal = new bootstrap.Modal(successModalEl);

    loadSessions();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const sessionId = sessionSelect.value;
        const clientName = document.getElementById("clientName").value;
        const cpf = document.getElementById("cpf").value;
        const seat = document.getElementById("seat").value;
        const paymentType = document.getElementById("payment").value;

        const ticket = new Ticket(
        Date.now(),
        sessionId,
        clientName,
        cpf,
        seat,
        paymentType
        );

        saveTicket(ticket);
        decreaseRoomCapacity(sessionId);
        form.reset();
        loadSessions();
        successModal.show();
    });
});

    function saveTicket(ticket) {
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    }

    function decreaseRoomCapacity(sessionId) {
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

    const sessionIndex = sessions.findIndex(s => s.id == sessionId);
    if (sessionIndex === -1) return;

    const roomIndex = rooms.findIndex(r => r.id == sessions[sessionIndex].roomId);
    if (roomIndex === -1) return;

    if (rooms[roomIndex].capacity > 0) {
        rooms[roomIndex].capacity--;
        localStorage.setItem("rooms", JSON.stringify(rooms));
    }
    }

function loadSessions() {
    const sessionSelect = document.getElementById("session");
      
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const movies = JSON.parse(localStorage.getItem("userMovies") || "[]");
    const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    const now = new Date();
    const preselectId = localStorage.getItem("selectedSessionId");

    sessionSelect.innerHTML = `<option value="" disabled ${!preselectId ? "selected" : ""} hidden>Selecione uma sessão</option>`;

    sessions.forEach(session => {
        const room = rooms.find(r => r.id == session.roomId);
        const movie = movies.find(m => m.id == session.movieId);
        const sessionDate = new Date(session.datetime);

        if (room && Number(room.capacity) > 0 && sessionDate > now) {
        const option = document.createElement("option");
        option.value = session.id;
        option.textContent = `${movie?.title || 'Filme'} | ${room.name} | ${new Date(session.datetime).toLocaleString("pt-BR")}`;
        sessionSelect.appendChild(option);
        }
    });

    localStorage.removeItem("selectedSessionId");
}
