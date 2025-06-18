let input = document.querySelector(".imnput");
let btn = document.querySelector(".btn");
let username = "";
let nameEl = document.querySelector(".name");
let bioEl = document.querySelector(".bio");
let img = document.querySelector(".img");
let dataPar = document.querySelector(".data_parent");

input.addEventListener("input", (e) => {
  username = e.target.value.trim();
});

btn.addEventListener("click", () => {
  if (username.length === 0) return alert("Enter a username");
  getUserInfo(username);
  getRepos(username);
});

function getUserInfo(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      nameEl.innerHTML = data.name || data.login || "No Name";
      bioEl.innerHTML = data.bio || "No Bio Available";
      img.style.backgroundImage = `url(${data.avatar_url})`;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
}

function getRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json())
    .then((repos) => {
      let html = "";
      for (let repo of repos) {
        html += `
          <div class="grid grid-cols-3 gap-4 px-4 py-2 border-b border-gray-600 text-sm">
            <div>${repo.name}</div>
            <div class="text-blue-400 underline">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div>${repo.language || "—"}</div>
          </div>
        `;
      }
      dataPar.innerHTML = html;
    })
    .catch((err) => {
      console.log("Repo Fetch Error:", err);
    });
}
