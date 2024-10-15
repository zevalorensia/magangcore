// Inisialisasi flatpickr untuk range tanggal di form detail
flatpickr(".date-range-picker", {
  mode: "range",
  dateFormat: "d/m/Y",
  altInput: true,
  altFormat: "F j, Y",
  allowInput: true,
});

// Logika untuk buka tutup modal
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const openModalBtns = [
  document.getElementById("openModalBtn1"),
  document.getElementById("openModalBtn2"),
  document.getElementById("openModalBtn3"),
];

// Data Activity Detail
const activityDetails = {
  openModalBtn1: {
    kategori: "Perencanaan",
    deskripsi: "",
  },
  openModalBtn2: {
    kategori: "Persiapan",
    deskripsi: "",
  },
  openModalBtn3: {
    kategori: "Pelaksanaan",
    deskripsi: "",
  },
};
// Buka Modal saat tombol "+" di klik dan tampilkan data
openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const detail = activityDetails[btn.id];
    if (detail) {
      document.querySelector("input[type='text']").value = detail.kategori;
      document.querySelector(".date-range-picker").value = detail.tanggal;
      document.querySelector("textarea").value = detail.deskripsi;
    }
    modalOverlay.style.display = "flex"; // Tampilkan modal dengan display flex
  });
});

// Tutup Modal
closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none"; // Sembunyikan modal
});

// Tutup modal dengan klik di luar modal (overlay)
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = "none"; // Sembunyikan modal
  }
});

//icon notif
const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});

// Toggle cards
const toggleButtons = document.querySelectorAll('[id^="toggleBtn"]');
toggleButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Mengakses elemen content dan icon dengan ID yang benar
    const content = document.getElementById(`content${index + 1}`);
    const icon = document.getElementById(`icon${index + 1}`);

    // Toggle visibility dan icon
    content.classList.toggle("hidden");
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  });
});
