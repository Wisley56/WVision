document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("sessionTableBody");
    const toggleFuture = document.getElementById("toggleFuture");

    toggleFuture.addEventListener("change", renderSessions);
    renderSessions();

    function renderSessions() {
        const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
        const movies = JSON.parse(localStorage.getItem("userMovies") || "[]");
        const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

        const showOnlyFuture = toggleFuture.checked;
        const now = new Date();

        tableBody.innerHTML = "";

        sessions.forEach(session => {
            const sessionDate = new Date(session.datetime);
            const movie = movies.find(m => m.id == session.movieId);
            const room = rooms.find(r => r.id == session.roomId);

            const isAvailable = room && Number(room?.capacity) > 0 && sessionDate > now;

            if (!showOnlyFuture || isAvailable) {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${movie?.title || "?"}</td>
                <td>${room?.name || "?"}</td>
                <td>${sessionDate.toLocaleString("pt-BR")}</td>
                <td>R$ ${parseFloat(session.price).toFixed(2)}</td>
                <td>${session.language}</td>
                <td>${session.format}</td>
            `;
                const btnCell = document.createElement("td");
                const btn = document.createElement("a");

                if (isAvailable) {
                    btn.className = "btn btn-primary btn-sm";
                    btn.textContent = "Comprar Ingresso";
                    btn.href = "#";
                    btn.addEventListener("click", () => {
                        localStorage.setItem("selectedSessionId", session.id);
                        window.location.href = "tickets.html";
                    });
                } else {
                    btn.className = "btn btn-secondary btn-sm disabled";
                    btn.textContent = "Esgotado";
                    btn.href = "javascript:void(0)";
                }

                btnCell.appendChild(btn);
                row.appendChild(btnCell);
                tableBody.appendChild(row);
            }
        });
    }

});
