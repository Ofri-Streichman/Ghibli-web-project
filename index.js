
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://ghibliapi.vercel.app/films";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async(req, res) => {
  try {
    const result = await axios.get(API_URL);
    let randFilm = result.data[Math.floor(Math.random() * result.data.length)];
    console.log(result);

    res.render("index.ejs", randFilm);
  } catch (error) {
    console.log(JSON.stringify(error.response.data) );
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


