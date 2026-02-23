document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#messagesTable tbody");
  const replyModal = document.getElementById("replyModal");
  const replyText = document.getElementById("replyText");
  const adminEmail = document.getElementById("adminEmail");
  const sendReplyBtn = document.getElementById("sendReplyBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  let selectedMessageId = null;

  // 📨 جلب كل الرسائل
  async function loadMessages() {
    const res = await fetch("http://localhost:4000/contactadmin/all");
    const data = await res.json();

    tableBody.innerHTML = "";
    data.results.forEach((msg) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${msg.id}</td>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.message}</td>
       <td><img src="http://localhost:4000${msg.image_url}" width="80"></td>

        <td>
          <button class="reply-btn" data-id="${msg.id}">Reply</button>
        </td>
        <td>
          <button class="delete-btn" data-id="${msg.id}">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // فتح مودال الرد
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("reply-btn")) {
      selectedMessageId = e.target.dataset.id;
      replyModal.classList.remove("hidden");
    }
    if (e.target.classList.contains("delete-btn")) {
      deleteMessage(e.target.dataset.id);
    }
  });

  // إرسال الرد
  sendReplyBtn.addEventListener("click", async () => {
    const reply = replyText.value.trim();
    const email = adminEmail.value.trim();
    if (!reply || !email) return alert("Please fill all fields");
    await fetch("http://localhost:4000/contactadmin/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message_id: selectedMessageId,
        admin_email: email,
        reply_text: reply,
      }),
    });
    replyModal.classList.add("hidden");
    replyText.value = "";
    adminEmail.value = "";
    loadMessages();
  });

  // حذف الرسالة
  async function deleteMessage(id) {
    if (!confirm("Delete this message?")) return;
    await fetch(`http://localhost:4000/contactadmin/${id}`, { method: "DELETE" });
    loadMessages();
  }

  closeModalBtn.addEventListener("click", () => replyModal.classList.add("hidden"));

  loadMessages();
});
