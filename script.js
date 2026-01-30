const searchInput = document.getElementById("search");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const card = document.getElementById("profileCard");

const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const bioEl = document.getElementById("bio");
const joinDateEl = document.getElementById("joinDate");
const portfolioEl = document.getElementById("portfolio");

// Search when Enter key is pressed
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const username = searchInput.value.trim();
    if (username !== "") {
      fetchUser(username);
    }
  }
});

async function fetchUser(username) {
  // Reset UI
  card.style.display = "none";
  error.style.display = "none";
  loading.style.display = "block";

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    // Display Data
    avatar.src = data.avatar_url;
    nameEl.textContent = data.name || data.login;
    bioEl.textContent = data.bio || "No bio available";

    const joinDate = new Date(data.created_at);
    joinDateEl.textContent = joinDate.toDateString();

    portfolioEl.href = data.blog || data.html_url;
    portfolioEl.textContent = data.blog
      ? "Portfolio"
      : "GitHub Profile";

    loading.style.display = "none";
    card.style.display = "block";
  } catch (err) {
    loading.style.display = "none";
    error.style.display = "block";
  }
}
