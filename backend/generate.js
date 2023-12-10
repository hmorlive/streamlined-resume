const PDFDocument = require("pdfkit");
const fs = require("fs");

const { data } = require("./data");

function createPDF() {
  // Create a document
  const doc = new PDFDocument({
    size: "letter",
    layout: "portrait",
    margin: 50,
  });

  const light = `${__dirname}/fonts/Ubuntu-Light.ttf`;
  const italic = `${__dirname}/fonts/Ubuntu-LightItalic.ttf`;
  const regular = `${__dirname}/fonts/Ubuntu-Regular.ttf`;
  const bold = `${__dirname}/fonts/Ubuntu-Bold.ttf`;
  const faRegular = `${__dirname}/fonts/fa-regular.otf`;
  const faSolid = `${__dirname}/fonts/fa-solid.otf`;
  const faBrand = `${__dirname}/fonts/fa-brand.otf`;
  const bulletChar = "\u2022";

  doc.registerFont("light", light);
  doc.registerFont("italic", italic);
  doc.registerFont("regular", regular);
  doc.registerFont("bold", bold);
  doc.registerFont("fa-regular", faRegular);
  doc.registerFont("fa-solid", faSolid);
  doc.registerFont("fa-brand", faBrand);

  doc.y = 25;
  // Pipe its output somewhere, like to a file or HTTP response
  doc.pipe(fs.createWriteStream("output.pdf"));

  //write name
  doc.font("bold").fontSize(26);
  data.contact.name ? doc.text(data.contact.name, { align: "center" }) : null;

  //write title
  doc.y = doc.y + 4; //move y down
  doc.font("light").fontSize(16);
  data.contact.title ? doc.text(data.contact.title, { align: "center" }) : null;

  //professional summary
  const firstColumnWidth = 350;

  doc.y = doc.y + 20; //move y down
  const startingColumnHeight = doc.y; //keep track of starter column

  const secondColumnStart = 435;

  //professional summary
  if (data.contact.summary) {
    doc.font("light").fontSize(9);
    doc.fillColor("#666666");
    doc.text("PROFESSIONAL SUMMARY", { width: firstColumnWidth });
    doc.y = doc.y + 3; //move y down;
    doc.fillColor("#555555");
    doc.font("regular").fontSize(9);
    doc.text(data.contact.summary, { width: firstColumnWidth });
  }

  //experience section
  if (data.experience) {
    doc.y = doc.y + 8;
    doc.font("light").fontSize(9);
    doc.fillColor("#666666");
    doc.text("EXPERIENCE", { width: firstColumnWidth });
    doc.y = doc.y + 3; //move y down;
    doc.fillColor("#555555");
    doc.font("regular").fontSize(9);
    data.experience.forEach((data) => {
      data.title
        ? doc
            .font("bold")
            .fontSize(10)
            .text(data.title, { continued: true, width: firstColumnWidth })
        : null; //title
      data.company
        ? doc.font("light").text(" - " + data.company, {
            continued: true,
            width: firstColumnWidth,
          })
        : null; //company
      //dates
      if (data.from || data.to) {
        let dateString = "";

        if (data.from) {
          const fromDate = new Date(data.from);
          const fromMonth = fromDate.toLocaleString("en-US", { month: "long" });
          const fromYear = fromDate.getFullYear();
          dateString += `${fromMonth} ${fromYear} - `;
        }

        if (data.to) {
          const toDate = new Date(data.to);
          const toMonth = toDate.toLocaleString("en-US", { month: "long" });
          const toYear = toDate.getFullYear();
          dateString += `${toMonth} ${toYear}`;
        } else {
          dateString += "Present";
        }

        doc
          .font("italic")
          .text(` (${dateString})`, { width: firstColumnWidth });
      }
      doc.fontSize(8).font("regular");
      data.keypoints.length > 0 ? (doc.y = doc.y + 2) : null;

      //keypoints
      data.keypoints.forEach((keypoint) => {
        if (keypoint.length > 0) {
          doc.text(bulletChar + " " + keypoint, { width: firstColumnWidth });
          doc.y = doc.y + 1;
        }
      });
      doc.y = doc.y + 7;
    });
  }

  //project section
  if (data.projects) {
    doc.font("light").fontSize(9);
    doc.fillColor("#666666");
    doc.text("PROJECTS", { width: firstColumnWidth });
    doc.y = doc.y + 3; //move y down;
    doc.fillColor("#555555");
    doc.font("regular").fontSize(9);
    data.projects.forEach((data) => {
      //name
      data.name
        ? doc.font("bold").fontSize(10).text(data.name, {
            continued: !!data.date,
            width: firstColumnWidth,
          })
        : null;

      //date
      const projectDate = new Date(data.date);
      const projectMonth = projectDate.toLocaleString("en-US", {
        month: "long",
      });
      const projectYear = projectDate.getFullYear();
      const formattedDate = `${projectMonth} ${projectYear}`;
      data.date ? doc.font("light").text(" - " + formattedDate) : null;
      if (data.url) {
        doc.y = doc.y + 3;
      }
      data.url
        ? doc
            .fontSize(8)
            .font("fa-solid")
            .text("\uf0ac", { continued: true })
            .font("regular")
            .text(" " + data.url, doc.x, doc.y - 1)
        : null;
      if (data.url) {
        doc.y = doc.y + 1;
      }
      data.description ? doc.y++ : null;
      data.description
        ? doc
            .font("light")
            .fontSize(9)
            .text(data.description, { width: firstColumnWidth })
        : null;
      doc.y = doc.y + 7;
    });
  }

  //references section
  doc.font("light").fontSize(9);
  doc.fillColor("#666666");
  doc.text("REFERENCES", { width: firstColumnWidth });
  doc.y = doc.y + 3; //move y down;
  doc.fillColor("#555555");
  doc.font("regular").fontSize(9);
  doc.text("Available upon request.");

  //second column rectangle
  const rectWidth = 200;
  const rectHeight = doc.page.height - doc.page.margins.bottom - startingColumnHeight;
  doc.moveTo(secondColumnStart - 10, startingColumnHeight - 20);
  doc.lineWidth(1);
  doc.rect(secondColumnStart - 10, startingColumnHeight -20 , rectWidth, rectHeight);
  doc.fill("#fbfbfb");
  doc.x = secondColumnStart;
  doc.y = startingColumnHeight;

  //contact section
  doc.font("light").fontSize(9);
  doc.fillColor("#666666");
  doc.text("CONTACT");
  doc.y = doc.y + 3; //move y down;
  doc.fillColor("#555555");
  doc.font("regular").fontSize(9);
  //location
  if (data.contact.location) {
    doc
      .fontSize(10)
      .font("fa-solid")
      .text("\uf3c5", { continued: true })
      .fontSize(9)
      .font("regular")
      .text(" " + data.contact.location);
    doc.y = doc.y + 10;
  }
  //phone
  if (data.contact.phone) {
    doc
      .fontSize(10)
      .font("fa-solid")
      .text("\uf3ce", { continued: true })
      .fontSize(9)
      .font("regular")
      .text(" " + data.contact.phone);
    doc.y = doc.y + 10;
  }
  //email
  if (data.contact.email) {
    doc
      .fontSize(10)
      .font("fa-solid")
      .text("\uf0e0", { continued: true })
      .fontSize(9)
      .font("regular")
      .text(" " + data.contact.email);
    doc.y = doc.y + 10;
  }
  //github
  if (data.contact.github) {
    doc
      .fontSize(10)
      .font("fa-brand")
      .text("\uf092", { continued: true })
      .fontSize(9)
      .font("regular")
      .text(" " + data.contact.github);
    doc.y = doc.y + 10;
  }
  //website
  if (data.contact.website) {
    doc
      .fontSize(10)
      .font("fa-solid")
      .text("\uf0ac", { continued: true })
      .fontSize(9)
      .font("regular")
      .text(" " + data.contact.website);
    doc.y = doc.y + 10;
  }

  //skills
  if (data.skills.length > 0) {
    doc.y = doc.y + 30;
    doc.font("light").fontSize(9);
    doc.fillColor("#666666");
    doc.text("SKILLS");
    doc.y = doc.y + 3; //move y down;
    doc.fillColor("#555555");
    doc.font("regular").fontSize(9);
    doc.lineGap(6);
    let count = 0;
    data.skills.forEach((skill) => {
      doc.text(skill.skill + "     ", {
        continued: !(count++ === data.skills.length),
      });
    });
  }

  //education
  if (data.skills.length > 0) {
    doc.y = doc.y + 30;
    doc.font("light").fontSize(9);
    doc.fillColor("#666666");
    doc.text("EDUCATION");
    doc.fillColor("#555555");
    doc.font("regular").fontSize(9);
    doc.lineGap(3);

    data.education.forEach((cert) => {
      doc
        .font("bold")
        .text(cert.name, { continued: !!cert.date })
        .font(light)
        .text(cert.date ? " - " + new Date(cert.date).getFullYear() : null);
      cert.institution ? doc.font("light").text(cert.institution) : null;
      cert.location ? doc.font("italic").text(cert.location) : null;
      doc.y = doc.y + 10;
    });
  }

  //languages section
  doc.y = doc.y + 24;
  doc.font("light").fontSize(9);
  doc.fillColor("#666666");
  doc.text("LANGUAGES", { width: firstColumnWidth });
  doc.y = doc.y + 3; //move y down;
  doc.fillColor("#555555");
  doc.font("regular").fontSize(9);
  doc.lineGap(6);
  data.languages.forEach((language) => {
    doc.text(language.language);
  })

  // Finalize PDF file
  doc.end();
}

createPDF();
