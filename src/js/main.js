const player = {
  title: document.getElementById("title"),
  artist: document.getElementById("artist"),
  tags: document.getElementById("tags")
};

document
  .querySelectorAll(".js-song")
  .forEach(node => node.addEventListener("click", displayVideo));

function displayVideo(e) {
  document.getElementById(
    "ytplayer"
  ).src = `https://www.youtube.com/embed/${e.currentTarget.dataset.videoid}`;

  const selectedSong = {
    title: e.currentTarget.children[1].children[0].innerText,
    artist: e.currentTarget.children[1].children[1].innerText,
    tags: e.currentTarget.children[1].children[2].innerText
  };
  player.title.innerText = selectedSong.title;
  player.artist.innerText = selectedSong.artist;
  player.tags.innerText = selectedSong.tags;
}
