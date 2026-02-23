document.addEventListener("DOMContentLoaded", () => {
  const tableContainer = document.getElementById("tableContainer");
  const popup = document.getElementById("popupForm");
  const addBtn = document.getElementById("addBtn");
  const saveBtn = document.getElementById("savePopupBtn");
  const cancelBtn = document.getElementById("cancelPopupBtn");

  let currentType = "users"; // users or admins
  let editId = null;

  // get all users or admins
  document.getElementById("showUsersBtn").addEventListener("click", () => loadData("users"));
  document.getElementById("showAdminsBtn").addEventListener("click", () => loadData("admins"));

  // add button
  addBtn.addEventListener("click", () => openPopup("add"));

  // close button
  cancelBtn.addEventListener("click", closePopup);

  // update button
  saveBtn.addEventListener("click", async () => {
    const username = document.getElementById("usernameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    if (!username || !email || !password) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = `http://localhost:4000/adminpanel/${currentType}${editId ? `/${editId}` : ""}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      alert("✅ Saved successfully!");
      closePopup();
      loadData(currentType);
    } catch (err) {
      alert("❌ " + err.message);
    }
  });

  // load data(Users/Admins)
  async function loadData(type) {
    currentType = type;
    tableContainer.innerHTML = `<p>Loading ${type}...</p>`;

    try {
      const res = await fetch(`http://localhost:4000/adminpanel/${type}`);
      const text = await res.text(); 

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("⚠️ Invalid JSON response from server:", text);
        throw new Error("Invalid JSON response:\n" + text.slice(0, 200));
      }

      if (!data.success) throw new Error(data.message);
      renderTable(data.results, type);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      tableContainer.innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
    }
  }

  // ✅ display info in table
  function renderTable(rows, type) {
    if (!rows.length) {
      tableContainer.innerHTML = `<p>No ${type} found.</p>`;
      return;
    }

    let html = `<table><tr>`;
    Object.keys(rows[0]).forEach((key) => (html += `<th>${key}</th>`));
    html += `<th>Actions</th></tr>`;

    rows.forEach((row) => {
      html += `<tr>`;
      Object.values(row).forEach((value) => (html += `<td>${value}</td>`));
      html += `<td>
        <button onclick="editRow('${type}', ${row.id})">✏️ Edit</button>
        <button onclick="deleteRow('${type}', ${row.id})">🗑️ Delete</button>
      </td></tr>`;
    });

    html += `</table>`;
    tableContainer.innerHTML = html;
  }

  // profile update
  window.editRow = async (type, id) => {
    editId = id;
    currentType = type;

    const res = await fetch(`http://localhost:4000/adminpanel/${type}/${id}`);
    const data = await res.json();

    document.getElementById("usernameInput").value = data.username || "";
    document.getElementById("emailInput").value = data.email || "";
    document.getElementById("passwordInput").value = "";

    openPopup("edit");
  };

  //delete profile
  window.deleteRow = async (type, id) => {
    if (!confirm("⚠️ Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`http://localhost:4000/adminpanel/${type}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      alert("🗑️ Deleted successfully!");
      loadData(type);
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // open window
  function openPopup(mode) {
    document.getElementById("popupTitle").textContent =
      mode === "edit" ? "Edit Record" : "Add Record";
    popup.classList.remove("hidden");
  }

  // close window
  function closePopup() {
    popup.classList.add("hidden");
    document.getElementById("usernameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
    editId = null;
  }
});
