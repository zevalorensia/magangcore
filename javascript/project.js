function openModal(modalId) {
  document.getElementById(modalId).classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}
// Close Edit Modal on overlay click
document.getElementById("editModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal("editModal");
  }
});

// Close Project Modal on overlay click
document.getElementById("projectModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal("projectModal");
  }
});

function filterCards(status) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    if (status === "all") {
      card.style.visibility = "visible";
      card.style.position = "relative";
    } else {
      if (card.classList.contains(status)) {
        card.style.visibility = "visible";
        card.style.position = "relative";
      } else {
        card.style.visibility = "hidden";
        card.style.position = "absolute";
      }
    }
  });
}

const addAssigneeBtn = document.getElementById("addAssigneeBtn");
const assigneeDropdown = document.getElementById("assigneeDropdown");
const selectedUsers = document.getElementById("selectedUsers");

function openDeleteModal() {
  const modal = document.getElementById("HapusModal");
  modal.classList.remove("hidden");
  modal.style.display = "flex"; // Mengatur display ke flex saat modal dibuka
}

function closeDeleteModal() {
  const modal = document.getElementById("HapusModal");
  modal.classList.add("hidden");
  modal.style.removeProperty("display"); // Menghapus semua modifikasi pada properti display
}
// Close Delete Modal on overlay click
document.getElementById("HapusModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeDeleteModal();
  }
});

// Tambahkan event.stopPropagation() pada elemen modal agar klik di dalamnya tidak menutup modal
document.querySelector(".bg-white").addEventListener("click", (event) => {
  event.stopPropagation();
});

// Toggle the assignee dropdown visibility
addAssigneeBtn.addEventListener("click", () => {
  assigneeDropdown.classList.toggle("hidden");
});

// Handle user selection from the dropdown
const userButtons = assigneeDropdown.querySelectorAll("button");
userButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userName = button.getAttribute("data-user");

    // Create a new element to display the selected user
    const userTag = document.createElement("div");
    userTag.className =
      "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
    userTag.innerHTML = `${userName} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeUserBtn">&times;</button>`;

    // Append the selected user to the selectedUsers container
    selectedUsers.appendChild(userTag);

    // Hide the dropdown after selecting
    assigneeDropdown.classList.add("hidden");

    // Add event listener to remove the user when the close button is clicked
    userTag.querySelector(".removeUserBtn").addEventListener("click", () => {
      selectedUsers.removeChild(userTag);
    });
  });
});

function openEditModal(project) {
  // Populate other fields
  document.getElementById("editProjectName").value = project.projectName;
  document.getElementById("editProjectStatus").value = project.projectStatus;
  document.getElementById("editProjectRequestor").value =
    project.projectRequestor;
  document.getElementById("editProjectArea").value = project.projectArea;
  document.getElementById("editProjectDescription").value =
    project.projectDescription;

  // Populate assignees
  const editSelectedUsers = document.getElementById("editSelectedUsers");
  editSelectedUsers.innerHTML = ""; // Clear previous assignees
  project.assignees.forEach((assignee) => {
    const userTag = document.createElement("div");
    userTag.className =
      "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
    userTag.innerHTML = `${assignee} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeUserBtn">&times;</button>`;

    // Append the user tag to the selectedUsers container
    editSelectedUsers.appendChild(userTag);

    // Add event listener to remove the user when the close button is clicked
    userTag.querySelector(".removeUserBtn").addEventListener("click", () => {
      editSelectedUsers.removeChild(userTag);
    });
  });

  // Populate existing URLs
  const urlList = document.getElementById("urlList");
  urlList.innerHTML = ""; // Clear previous URL list
  const editUrlInputs = document.getElementById("editUrlInputs");
  if (project.urls.length > 0) {
    project.urls.forEach((url) => {
      const listItem = document.createElement("li");
      listItem.textContent = url;
      urlList.appendChild(listItem);
    });
    editUrlInputs.classList.remove("hidden");
  } else {
    editUrlInputs.classList.add("hidden");
  }

  // Populate existing files
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = ""; // Clear previous file list
  const editFileInputs = document.getElementById("editFileInputs");
  if (project.files.length > 0) {
    project.files.forEach((file) => {
      const listItem = document.createElement("li");
      listItem.textContent = file; // Assuming file is just a name or URL
      fileList.appendChild(listItem);
    });
    editFileInputs.classList.remove("hidden");
  } else {
    editFileInputs.classList.add("hidden");
  }

  // Open the modal
  document.getElementById("editModal").classList.remove("hidden");
}

// Example usage with sample project data
const projectData = {
  projectName: "Project X",
  projectStatus: "active",
  projectRequestor: "Samsul",
  projectArea: "Development",
  projectDescription: "This is a sample project description.",
  assignees: ["User 1", "User 2"],
  urls: ["http://example.com", "http://another-example.com"], // Example URLs
  files: ["document1.pdf", "image1.png"], // Example documents
};

// Call this function when the pencil icon is clicked
document.querySelector(".fa-edit").addEventListener("click", () => {
  openEditModal(projectData);
});
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
      event.preventDefault(); // Cegah tindakan default jika diperlukan
      const userName = button.getAttribute("data-user");

      // Cek jika user sudah dipilih
      const existingUser = Array.from(selectedUsers.children).some((userTag) =>
        userTag.textContent.includes(userName)
      );
      if (!existingUser) {
        // Membuat tag untuk user yang dipilih
        const userTag = document.createElement("div");
        userTag.className =
          "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
        userTag.innerHTML = `${userName} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeUserBtn">&times;</button>`;

        // Tambahkan tag user ke container selectedUsers
        selectedUsers.appendChild(userTag);

        // Tambahkan fungsi untuk menghapus
        userTag
          .querySelector(".removeUserBtn")
          .addEventListener("click", () => {
            selectedUsers.removeChild(userTag);
          });
      }

      // Sembunyikan dropdown setelah memilih
      assigneeDropdown.classList.add("hidden");
    });
  });
});
//notif
const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});
