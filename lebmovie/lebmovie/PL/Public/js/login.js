// public/js/login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
const reason = localStorage.getItem("redirectReason");


if (reason === "loginRequired") {
    alert("⚠️ Please login first to access the home page.");
  } else if (reason === "loginRequiredMovies") {
    alert("🎬 Please login to view movies!");
  }

  localStorage.removeItem("redirectReason");


  if (!form) {
    console.error("⚠️ loginForm not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    
    const emailOrUsername = form.email.value.trim();
    const password = form.password.value.trim();

    
    if (!emailOrUsername || !password) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    try {
      console.log("🟢 Sending login request:", { emailOrUsername, password });

      // login fetch 
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });

      const data = await res.json();
      console.log("🟢 Login response:", data);

      // verify login if succes or no
      if (!res.ok || !data.success) {
        alert(data.message || "❌ Login failed");
        return;
      }

      // save user data
      const userData = {
        id: data.user?.id,
        username: data.user?.username || "User",
        email: data.user?.email || emailOrUsername,
        role: data.role,
        profile_image: data.user?.profile_image || "../Public/images/default.png",
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      // ✅ نجاح
      alert(data.message || "✅ Login successful!");

      // homepage depend user or admin
      if (data.role === "admin") {
        window.location.href = "admin-home.html";
      } else {
        window.location.href = "home.html";
      }
    } catch (err) {
      console.error("❌ Network or CORS error:", err);
      alert("❌ Could not connect to backend. Please check your server.");
    }
  });
});
