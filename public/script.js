async function loadMessages() {
  const res = await fetch("/api/messages");
  const messages = await res.json();

  const container = document.getElementById("messages");
  container.innerHTML = messages
    .map(m => `<p><b>${m.username}</b>: ${m.text}</p>`)
    .join("");
  container.scrollTop = container.scrollHeight;
}

async function sendMessage() {
  const username = document.getElementById("username").value;
  const text = document.getElementById("message").value;

  if (!username || !text) return alert("Fill both fields!");

  await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, text })
  });

  document.getElementById("message").value = "";
  loadMessages();
}

setInterval(loadMessages, 2000);
loadMessages();
