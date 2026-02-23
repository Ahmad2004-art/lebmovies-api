console.log("✅ register.js loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  if (!form) {
    alert("⚠️ Register form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username?.value.trim();
    const email = form.email?.value.trim();
    const password = form.password?.value.trim();
    const confirmPassword = form.confirmPassword?.value.trim();

    console.log("🧩 Debug values:", { username, email, password, confirmPassword });

    if (!username || !email || !password || !confirmPassword) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      console.log("✅ Response from server:", data);

      if (!res.ok) {
        alert(`❌ ${data.message || "Registration failed"}`);
        return;
      }

      alert(data.message || "✅ Registration successful!");
      window.location.href = "login.html";
    } catch (err) {
      console.error("❌ Error connecting to backend:", err);
      alert("❌ Could not connect to backend.");
    }
  });
});
