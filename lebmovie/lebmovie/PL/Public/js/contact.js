document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMsg = document.getElementById("responseMsg");
  const imageInput = document.getElementById("imageUpload");

  // 📩 عند إرسال النموذج
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const file = imageInput.files[0];

    if (!name || !email || !message) {
      showMessage("⚠️ Please fill in all fields.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    if (file) formData.append("image", file);

    try {
      const res = await fetch("http://localhost:4000/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showMessage("✅ Message sent successfully!", "success");
        form.reset();
      } else {
        showMessage("❌ Failed to send message.", "error");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      showMessage("⚠️ Something went wrong.", "error");
    }
  });

  function showMessage(msg, type) {
    responseMsg.textContent = msg;
    responseMsg.classList.remove("hidden");
    responseMsg.style.color = type === "success" ? "#00ff88" : "#ff5555";
  }
});
