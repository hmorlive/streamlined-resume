const { generatePDF } = require('./generation/generate');
const { validateData } = require("./validation/validate");

async function lambdaHandler(event, context) {
  try {
    // Extract data from the event object
    const data = JSON.parse(event.body);

    console.log("data:", data);

    // Validate and process the data
    validateData(data);
    const pdfBuffer = await generatePDF(data);

    // Return the response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf'
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.log(error);

    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}
module.exports.lambdaHandler = lambdaHandler