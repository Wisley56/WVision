import { Room } from "../models/rooms.js";

let successModal;
let deleteRoomId = null;
let roomIdBeingEdited = null;
let confirmDeleteModal;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("roomForm");
  successModal = new bootstrap.Modal(document.getElementById("successModal"));
  confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));

  const btnConfirmDeleteRoom = document.getElementById("btnConfirmDeleteRoom");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const room = createRoomFromForm();
  const isEditing = !!roomIdBeingEdited;

  if (isEditing) {
    updateRoom(room);
  } else {
    saveRoom(room);
  }

  const titleEl = document.getElementById("successModalTitle");
  const bodyEl = document.getElementById("successModalBody");

  if (isEditing) {
    titleEl.innerHTML = `<i class="bi bi-pencil-square"></i> Sala Atualizada`;
    bodyEl.textContent = "As informações da sala foram atualizadas com sucesso!";
  } else {
    titleEl.innerHTML = `<i class="bi bi-check-circle-fill"></i> Sala Cadastrada`;
    bodyEl.textContent = "Sala foi registrada com sucesso!";
  }

  form.reset();
  roomIdBeingEdited = null;
  document.getElementById("modalRoomLabel").textContent = "Cadastrar Sala";

  const modalInstance = bootstrap.Modal.getInstance(document.getElementById("modalRoom"));
  if (modalInstance) modalInstance.hide();

  renderRoomTable();
  successModal.show();
});
  

  btnConfirmDeleteRoom.addEventListener("click", () => {
    if (deleteRoomId !== null) {
      deleteRoom(deleteRoomId);
      confirmDeleteModal.hide();
      deleteRoomId = null;
    }
  });

  renderRoomTable();
});

function createRoomFromForm() {
  const id = roomIdBeingEdited || Date.now();
  const name = document.getElementById("name").value;
  const capacity = parseInt(document.getElementById("capacity").value, 10);
  const type = document.getElementById("type").value;
  return new Room(id, name, capacity, type);
}

function saveRoom(room) {
  const rooms = getRooms();
  rooms.push(room);
  localStorage.setItem("rooms", JSON.stringify(rooms.map(r => r.toJSON())));
}

function updateRoom(updatedRoom) {
  const rooms = getRooms().map(r => r.getId() === updatedRoom.getId() ? updatedRoom : r);
  localStorage.setItem("rooms", JSON.stringify(rooms.map(r => r.toJSON())));
}

function deleteRoom(id) {
  const rooms = getRooms().filter(r => r.getId() !== id);
  localStorage.setItem("rooms", JSON.stringify(rooms.map(r => r.toJSON())));
  renderRoomTable();
}

function getRooms() {
  const raw = JSON.parse(localStorage.getItem("rooms") || "[]");
  return raw.map(r => new Room(r.id, r.name, r.capacity, r.type));
}

function renderRoomTable() {
  const tableBody = document.getElementById("tableBodyRooms");
  const rooms = getRooms();

  tableBody.innerHTML = "";

  if (rooms.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" class="text-center">Nenhuma sala cadastrada.</td></tr>`;
    return;
  }

  rooms.forEach(room => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${room.getName()}</td>
      <td>${room.getCapacity()}</td>
      <td>${room.getType()}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editRoom(${room.getId()})">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="confirmDelete(${room.getId()})">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

window.editRoom = function(id) {
  const room = getRooms().find(r => r.getId() === id);
  if (!room) return;

  roomIdBeingEdited = id;
  document.getElementById("name").value = room.getName();
  document.getElementById("capacity").value = room.getCapacity();
  document.getElementById("type").value = room.getType();
  document.getElementById("modalRoomLabel").textContent = "Editar Sala";

  const modalInstance = new bootstrap.Modal(document.getElementById("modalRoom"));
  modalInstance.show();
};

window.confirmDelete = function(id) {
  deleteRoomId = id;
  confirmDeleteModal.show();
};
