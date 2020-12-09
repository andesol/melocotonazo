const player = {
  title: document.getElementById("title"),
  artist: document.getElementById("artist"),
  tags: document.getElementById("tags")
};

document.querySelectorAll(".js-song").forEach(node => {
  node.addEventListener("click", e => {
    displayVideo(e);
    displayInfo(e);
    scrollToPlayer();
  });
});

function displayVideo(e) {
  console.log(e.currentTarget.children[1].children[0].children[0].innerText);
  document.getElementById(
    "ytplayer"
  ).src = `https://www.youtube.com/embed/${e.currentTarget.dataset.videoid}`;
}

function displayInfo(e) {
  const selectedSong = {
    title: e.currentTarget.children[1].children[0].children[0].innerText,
    artist: e.currentTarget.children[1].children[0].children[1].innerText,
    tags: e.currentTarget.children[1].children[0].children[2].innerText
  };
  player.title.innerText = selectedSong.title;
  player.artist.innerText = selectedSong.artist;
  player.tags.innerText = selectedSong.tags;
}

function scrollToPlayer() {
  document.getElementById("ytplayer").scrollIntoView({ behavior: "smooth" });
}
