function openModal() {
  document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Tambahkan event listener untuk menutup modal jika mengklik di luar modal-content
document.getElementById("myModal").addEventListener("click", function (event) {
  if (event.target === this) {
    // Jika klik di luar modal-content
    closeModal(); // Tutup modal
  }
});
function openEditPanel() {
  const editPanel = document.getElementById("editPanel");
  const overlay = document.getElementById("overlay"); // Dapatkan elemen overlay

  overlay.classList.add("show"); // Tampilkan overlay
  editPanel.classList.add("show"); // Tampilkan panel edit
}

function closeEditPanel() {
  const editPanel = document.getElementById("editPanel");
  const overlay = document.getElementById("overlay"); // Dapatkan elemen overlay

  overlay.classList.remove("show"); // Sembunyikan overlay
  editPanel.classList.remove("show"); // Sembunyikan panel edit
}

// Tambahkan event listener agar bisa menutup panel ketika overlay diklik
document.getElementById("overlay").addEventListener("click", closeEditPanel);
