import express from "express";
import axios from "axios";
import cors from "cors";
const {Request, Response} = express;

const app = express();
const port = 3001; // You can choose a different port if needed

app.use(cors()); // Enable CORS for all routes
// Endpoint to proxy the Google Places API request
app.get("/api/places", async (req, res) => {
  const {latitude, longitude} = req.query;
  const apiKey = "AIzaSyCDRjHOcxs7-Fpp8fHTYvRVONwZZkvsL3k"; // Replace with your actual API key
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${apiKey}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching nearby restaurants:", error);
    res.status(500).json({error: "An error occurred"});
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
