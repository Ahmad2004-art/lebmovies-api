// (Logout)
export function logout() {
  localStorage.clear();
  alert("✅ Logged out successfully!");
  window.location.href = "login.html";
}

// (Authorization)
export function requireRole(requiredRole) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  
  if (!email || !role) {
    alert("⚠️ Please login first!");
    window.location.href = "login.html";
    return false;
  }

  

  console.log(`✅ Access granted for ${role}: ${email}`);
  return true;
}
