//simple express server, may go lambda later
const express = require("express");
const cors = require("cors");
const app = express();
const { generatePDF } = require('./generation/generate');
const { validateData } = require("./validation/validate")

// Enable CORS for all routes
app.use(cors());

// Enable JSON parsing for the body of the request
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    //1. extract data from body
    const data = req.body;

    //2. validate data from body
    validateData(data);

    // format pdf and return buffer
    const pdfBuffer = await generatePDF(data);

    //return buffer
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    return res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.listen(3100, () => {
  console.log("Server live on port 3100");
});
