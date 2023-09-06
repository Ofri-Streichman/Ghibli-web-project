
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";
import fsp from "fs/promises";


const app = express();
const port = 3000;
const API_URL = "https://ghibliapi.vercel.app/films";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const youtubeKey = readFile("./private_data/youtube-api-key.txt");
const youtubeApiUrl = "https://www.googleapis.com/youtube/v3";



app.get("/", async(req, res) => {
  try {
    // get a Ghibli film from XXX database api
    const result = await axios.get(API_URL);
    let randFilm = result.data[Math.floor(Math.random() * result.data.length)];
    console.log(randFilm);

    // get the film's soundtrack from youtube api
    let url = `${youtubeApiUrl}/search?key=${youtubeKey}&type=video&part=snippet&q=${randFilm.title} original trailer subtitles`;
    const response = await axios.get(url);
    const topVideoIDS = response.data.items.map((item) => item.id.videoId);

    // const soundtrackURL = `https://www.youtube.com/watch?v=${topVideoIDS[0]}`;

    res.render("index.ejs", {
      film: randFilm,
      trailer: topVideoIDS[0],
    });

  } catch (error) {
    console.log(JSON.stringify(error) );
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//reading secret key
function readFile(filePath) {
  return fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
}

