//simple express server, may go lambda later
const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(cors());

// Enable JSON parsing for the body of the request
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    return res.send({ response: "All good here" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // Use sendStatus for setting the status code
  }
});

app.listen(3100, () => {
  console.log("Server live on port 3100");
});
