// public/js/admin-home.js
import { logout, requireRole } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // check if user is as admin
  if (!requireRole("admin")) return;

  
  const email = localStorage.getItem("email");
  const adminNameEl = document.getElementById("adminName");
  if (adminNameEl) adminNameEl.textContent = email.split("@")[0].toUpperCase();

  // logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
