const { URL } = require("url");
const fetch = require("node-fetch");
require("dotenv").config();

async function getJSON(url) {
  const response = await fetch(url);
  return await response.json();
}

module.exports = async function() {
  const apiAirtable = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_USER_URL}/Main`
  );
  apiAirtable.searchParams.set("api_key", process.env.AIRTABLE_API_KEY);

  const songsResponse = await getJSON(apiAirtable);

  const songs = songsResponse.records;

  // Get video id from url
  const videoIds = songs.map(song =>
    song.fields.Link.split("watch?v=")[1].trim()
  );

  const apiYoutube = new URL(
    "https://youtube.googleapis.com/youtube/v3/videos"
  );

  apiYoutube.search = new URLSearchParams({
    part: "snippet",
    id: videoIds,
    key: process.env.YOUTUBE_API_KEY
  });

  const youtubeResponse = await getJSON(apiYoutube);

  const thumbnails = youtubeResponse.items.map(
    video => video.snippet.thumbnails.default.url
  );

  return songs.map((song, i) => {
    return {
      id: song.id,
      ...song.fields,
      videoId: videoIds[i],
      thumbnail: thumbnails[i]
    };
  });
};
