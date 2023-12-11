const { validateData } = require("../validation/validate");
const {
  completeData,
  missingFieldsData,
  exceedingLengthData,
} = require("./data");
const { generatePDF } = require("../generation/generate");
const fs = require("fs");

// test different validation scenarios
async function runTests() {
  try {
    validateData(missingFieldsData);
    console.log("Missing fields data test passed");
  } catch (error) {
    console.error("Missing fields data test failed:", error.message);
  }

  try {
    validateData(exceedingLengthData);
    console.log("Exceeding length data test passed");
  } catch (error) {
    console.error("Exceeding length data test failed:", error.message);
  }

  try {
    validateData(completeData);
    console.log("Complete data test passed");
  } catch (error) {
    console.error("Valid data test failed:", error.message);
  }

  const buffer = await generatePDF(completeData);
  saveBufferToFile(buffer, 'resume.pdf');
}

//stream to file
async function saveBufferToFile(buffer, filename) {
    const stream = fs.createWriteStream(filename);
    stream.on('finish', () => {
      console.log(`The file has been saved as ${filename}`);
    });
    stream.on('error', (err) => {
      console.error('Error writing to file:', err);
    });
    stream.end(buffer);
  }

runTests();
