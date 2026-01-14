const button = document.getElementById("shortenBtn");
const input = document.getElementById("longUrl");
const loader = document.getElementById("loader");
const result = document.getElementById("result");
const toast = document.getElementById("toast");

button.addEventListener("click", async () => {
  const longUrl = input.value.trim();
  if (!longUrl) return alert("Please enter a URL");

  loader.classList.remove("hidden");
  result.classList.add("hidden");

  try {
    const res = await fetch(
      "https://masud74.app.n8n.cloud/webhook/URL Shortner",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl })
      }
    );

    const data = await res.json();
    const shortUrl = data.shortUrl;

    loader.classList.add("hidden");

    result.innerHTML = `
      🎉 <strong>Congratulations!</strong><br>
      <a href="${shortUrl}" target="_blank" id="shortLink">
        ${shortUrl}
      </a>
      <br>
      <button class="copy-btn" onclick="copyLink('${shortUrl}')">
        📋 Copy Link
      </button>
    `;

    result.classList.remove("hidden");

    // Confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

  } catch (err) {
    loader.classList.add("hidden");
    alert("Something went wrong!");
    console.error(err);
  }
});

// Copy function
function copyLink(link) {
  navigator.clipboard.writeText(link).then(() => {
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 2000);
  });
}
