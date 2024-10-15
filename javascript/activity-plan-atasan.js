// Function to open a modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");
  modal.style.display = "flex";
}

// Function to close a modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none"; // Menyembunyikan modal
}

// Function to handle form submission
function handleCreateActivity(event) {
  event.preventDefault(); // Mencegah reload halaman

  // Ambil semua input yang perlu diisi
  const project = document.getElementById("createProject").value;
  const requestor = document.getElementById("createRequestor").value;
  const scope = document.getElementById("createScope").value;
  const duration = document.getElementById("createDuration").value;
  const startSchedule = document.getElementById("CreateStartSchedule").value;
  const endSchedule = document.getElementById("CreatetEndSchedule").value;
  const selectedUsers =
    document.getElementById("selectedUsers").children.length;

  // Ambil elemen untuk menampilkan pesan validasi
  const validationMessage = document.getElementById("validationMessage");
  validationMessage.innerHTML = ""; // Reset pesan

  // Cek apakah semua field diisi
  if (
    !project ||
    !requestor ||
    !scope ||
    !duration ||
    !startSchedule ||
    !endSchedule
  ) {
    validationMessage.innerHTML = "Harap isi semua field.";
    return; // Jika ada yang kosong, tidak melakukan apa-apa
  }

  // Cek apakah setidaknya satu assignee dipilih
  if (selectedUsers === 0) {
    validationMessage.innerHTML = "Harap pilih setidaknya satu assignee.";
    return; // Jika tidak ada assignee, tidak melakukan apa-apa
  }

  // Simpan data ke server atau lakukan tindakan lain di sini

  // Tutup modal setelah semua validasi berhasil
  closeModal("modalOverlayCreate");

  // Tampilkan notifikasi setelah modal ditutup
  setTimeout(() => {
    alert("Activity Plan Created!");
  }, 300); // Delay 300ms untuk memastikan modal sudah tertutup
}

// Open and Close Create Modal
document
  .getElementById("openModalBtn")
  .addEventListener("click", () => openModal("modalOverlayCreate"));
document
  .getElementById("closeCreateModalBtn")
  .addEventListener("click", () => closeModal("modalOverlayCreate"));

// Event listener untuk menutup modal jika overlay diklik
document
  .getElementById("modalOverlayCreate")
  .addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeModal("modalOverlayCreate");
    }
  });

// Handle Assignee Dropdown
const addAssigneeBtn = document.getElementById("addAssigneeBtn");
const assigneeDropdown = document.getElementById("assigneeDropdown");
const selectedUsersContainer = document.getElementById("selectedUsers");

// Handle opening and closing the dropdown
addAssigneeBtn.addEventListener("click", function () {
  assigneeDropdown.classList.toggle("hidden");
});

// Handle user selection from the dropdown
const userButtons = assigneeDropdown.querySelectorAll("button");
userButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userName = button.getAttribute("data-user");

    // Cek apakah user sudah dipilih sebelumnya
    const existingTags = Array.from(selectedUsersContainer.children).map(
      (tag) => tag.innerText.replace("×", "").trim()
    );
    if (!existingTags.includes(userName)) {
      // Buat tag pengguna dan tambahkan ke kontainer
      const userTag = document.createElement("div");
      userTag.className =
        "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
      userTag.innerHTML = `
    ${userName}
    <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeUserBtn">&times;</button>
  `;

      // Append the selected user to the container
      selectedUsersContainer.appendChild(userTag);

      // Add event listener to remove the user when the close button is clicked
      userTag.querySelector(".removeUserBtn").addEventListener("click", () => {
        selectedUsersContainer.removeChild(userTag);
      });
    }

    // Sembunyikan dropdown setelah memilih user
    assigneeDropdown.classList.add("hidden");
  });
});

// Function to open the edit modal
function openEditModal(data) {
  // Fill the form with existing data
  document.getElementById("editProject").value = data.project;
  document.getElementById("editRequestor").value = data.requestor;
  document.getElementById("editScope").value = data.scope;
  document.getElementById("editDuration").value = data.duration;
  document.getElementById("editStartSchedule").value = data.startSchedule;
  document.getElementById("editEndSchedule").value = data.endSchedule;
  document.getElementById("editStartActual").value = data.startActual;
  document.getElementById("editEndActual").value = data.endActual;
  document.getElementById("EditNotes").value = data.notes;

  // Add existing assignees to the modal
  const selectedUsers = document.getElementById("editSelectedUsers");
  selectedUsers.innerHTML = ""; // Clear any existing assignee tags

  data.assignees.forEach((user) => {
    addAssigneeTag(user, selectedUsers);
  });

  // Show the modal
  const modal = document.getElementById("modalOverlayEdit");
  modal.classList.remove("hidden"); // Remove hidden class
  modal.style.display = "flex"; // Set display to flex
}

// Function to close the edit modal
function closeEditModal() {
  const modal = document.getElementById("modalOverlayEdit");
  modal.classList.add("hidden"); // Add hidden class
  modal.style.display = "none"; // Set display to none
}

// Function to handle the edit action and save the edited activity plan
function saveEditedActivityPlan() {
  const editActivityForm = document.getElementById("editActivityForm");
  const formData = new FormData(editActivityForm);

  // Collect selected users from the assignee tags
  const selectedUsersList = Array.from(
    document.querySelectorAll("#editSelectedUsers div")
  ).map((userTag) => userTag.textContent.trim().replace("×", ""));

  formData.append("assignees", selectedUsersList);

  console.log(Object.fromEntries(formData)); // Log the form data

  closeEditModal(); // Close the modal first
  setTimeout(() => {
    alert("Activity plan saved!"); // Show notification after modal is closed
  }, 100); // Slight delay to ensure the modal closes before showing the alert
}

// Function to add an assignee tag
function addAssigneeTag(userName, container) {
  const userTag = document.createElement("div");
  userTag.className =
    "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
  userTag.innerHTML = `${userName} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeUserBtn">&times;</button>`;

  // Add functionality to remove the user
  userTag.querySelector(".removeUserBtn").addEventListener("click", () => {
    container.removeChild(userTag);
  });

  container.appendChild(userTag);
}

// Handle Assignees in the Edit Modal
document.addEventListener("DOMContentLoaded", () => {
  const addAssigneeBtn = document.getElementById("editAddAssigneeBtn");
  const assigneeDropdown = document.getElementById("editAssigneeDropdown");
  const selectedUsers = document.getElementById("editSelectedUsers");

  // Toggle dropdown visibility
  addAssigneeBtn.addEventListener("click", () => {
    assigneeDropdown.classList.toggle("hidden");
  });

  // Handle user selection
  assigneeDropdown.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default action if necessary
      const userName = button.getAttribute("data-user");

      // Check if user is already selected
      const existingUser = Array.from(selectedUsers.children).some((userTag) =>
        userTag.textContent.includes(userName)
      );
      if (!existingUser) {
        addAssigneeTag(userName, selectedUsers); // Add user tag
      }

      // Hide dropdown after selection
      assigneeDropdown.classList.add("hidden");
    });
  });
});

// Close Edit Modal on overlay click
document
  .getElementById("modalOverlayEdit")
  .addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeEditModal();
    }
  });

// Attach event listener to the close button
document
  .getElementById("closeEditModalBtn")
  .addEventListener("click", closeEditModal);

// Event listener for form submission
const editActivityForm = document.getElementById("editActivityForm");
editActivityForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission
  saveEditedActivityPlan(); // Call the save function
});

// Example data to be edited
const exampleData = {
  project: "1",
  requestor: "John Doe",
  scope: "Lingkup A",
  assignees: ["User 1", "User 2"],
  duration: "3 months",
  startSchedule: "2024-10-01",
  endSchedule: "2024-12-31",
  startActual: "2024-10-05",
  endActual: "2024-12-28",
  notes: "Deskripsi A",
};

// Trigger to open the edit modal (replace with your actual trigger)
document.querySelector('.text-blue-500[title="Edit"]').onclick = () =>
  openEditModal(exampleData);

// Function to open delete modal
function openDeleteModal() {
  const modal = document.getElementById("DeleteModal");
  modal.classList.remove("hidden");
  modal.style.display = "flex"; // Mengatur display ke flex saat modal dibuka
}

function deleteActivityPlan() {
  const modal = document.getElementById("DeleteModal");
  modal.classList.add("hidden");
  modal.style.removeProperty("display"); // Menghapus semua modifikasi pada properti display
}

function closeDeleteModal(event) {
  event.stopPropagation(); // Mencegah bubbling event agar tombol Batal dapat diklik
  const modal = document.getElementById("DeleteModal");
  modal.classList.add("hidden");
  modal.style.removeProperty("display");
}

// Close Delete Modal on overlay click
document.getElementById("DeleteModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    deleteActivityPlan();
  }
});

// Tambahkan event.stopPropagation() pada elemen modal agar klik di dalamnya tidak menutup modal
document.querySelector(".bg-white").addEventListener("click", (event) => {
  event.stopPropagation();
});

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});

//SEARCH
function searchTable() {
  const searchProject = document
    .getElementById("searchProject")
    .value.toLowerCase();
  const searchScope = document
    .getElementById("searchScope")
    .value.toLowerCase();
  const searchStartDate = document.getElementById("searchStartDate").value;
  const searchEndDate = document.getElementById("searchEndDate").value;

  const table = document.querySelector("table tbody");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const projectCell = rows[i]
      .getElementsByTagName("td")[1]
      .textContent.toLowerCase();
    const scopeCell = rows[i]
      .getElementsByTagName("td")[4]
      .textContent.toLowerCase();
    const startDateCell = rows[i].getElementsByTagName("td")[7].textContent;
    const endDateCell = rows[i].getElementsByTagName("td")[8].textContent;

    // Check if the current row matches the search criteria
    const matchProject = !searchProject || projectCell.includes(searchProject);
    const matchScope = !searchScope || scopeCell.includes(searchScope);
    const matchStartDate =
      !searchStartDate || new Date(startDateCell) >= new Date(searchStartDate);
    const matchEndDate =
      !searchEndDate || new Date(endDateCell) <= new Date(searchEndDate);

    if (matchProject && matchScope && matchStartDate && matchEndDate) {
      rows[i].style.display = ""; // Show the row
    } else {
      rows[i].style.display = "none"; // Hide the row
    }
  }
}
