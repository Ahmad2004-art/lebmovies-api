// public/js/profile.js
document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  
  if (!userData || !userData.email || !userData.id) {
    alert("⚠️ Please login first!");
    window.location.href = "login.html";
    return;
  }

  
  const usernameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const uploadInput = document.getElementById("uploadImage");
  const profileImg = document.getElementById("profileImage");
  const saveBtn = document.getElementById("saveBtn");
  const backBtn = document.getElementById("backBtn");

  if (!saveBtn) {
    console.error("❌ saveBtn not found!");
    return;
  }

  // default profile
  fetch(`http://localhost:4000/profile/${userData.id}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) throw new Error(data.message);
      const user = data.user;
      usernameField.value = user.username;
      emailField.value = user.email;
      profileImg.src = user.profile_image || "../Public/images/default.png";
    })
    .catch((err) => {
      console.error("❌ Load error:", err);
      alert("❌ Could not load profile data.");
    });

  //update img
  let newProfileImage = null;
  uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profileImg.src = event.target.result;
        newProfileImage = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // save update profile
  saveBtn.addEventListener("click", async () => {
    alert("🟢 Save button clicked!"); 

    const email = emailField.value.trim();
    const password = passwordField.value.trim();

    if (!email && !password && !newProfileImage) {
      alert("⚠️ No changes to save!");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData.id,
          email: email || null,
          password: password || null,
          profile_image: newProfileImage || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "❌ Update failed");
      }

      localStorage.setItem("userData", JSON.stringify(data.user));
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Update error:", err);
      alert("❌ Could not update profile. Please check the console.");
    }
  });

  // 🔙 زر الرجوع
  backBtn.addEventListener("click", () => {
    window.location.href = "home.html";
  });
});
