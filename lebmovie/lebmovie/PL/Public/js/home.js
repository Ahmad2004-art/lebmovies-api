// public/js/home.js
document.addEventListener("DOMContentLoaded", () => {
  
  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem("userData"));
  } catch (err) {
    console.error("❌ Failed to parse userData:", err);
  }

  const userNameSpan = document.getElementById("userName");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileIcon = document.getElementById("profileIcon");

  if (!userData || !userData.email || !userData.role) {
  localStorage.setItem("redirectReason", "loginRequired");
  window.location.href = "login.html";
  return;
}


  const { email, username, profile_image, role } = userData;

  // display name in welcome
  if (userNameSpan) {
    const displayName = username
      ? username.toUpperCase()
      : email.split("@")[0].toUpperCase();
    userNameSpan.textContent = displayName;
  }

  //profile icone update
  if (profileIcon) {
    profileIcon.src =
      profile_image && profile_image.trim() !== ""
        ? profile_image
        : "../Public/images/default.png";

    profileIcon.style.cursor = "pointer";

    profileIcon.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }

  // logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const confirmLogout = confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        localStorage.removeItem("userData");
        alert("👋 You have been logged out");
        window.location.href = "login.html";
      }
    });
  }

  // ✅ تسجيل للمطورين في الـ Console
  console.log(`🎬 Logged in as ${role.toUpperCase()} (${email})`);
});
