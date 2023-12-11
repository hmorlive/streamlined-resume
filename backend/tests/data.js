//real valid data
const completeData = {
  contact: {
    name: "Hazmed Moreno",
    title: "Software Engineer",
    summary:
      "Driven by a passion for automation and understanding the nuts and bolts of technology, I find joy in crafting solutions that simplify and enhance both work and life. Eager to learn from seasoned professionals, I aim to contribute to meaningful projects that leave a lasting impact. My journey is about constant growth, embracing new challenges, and staying at the forefront of software innovation.",
    location: "Miami, FL",
    email: "mail@hazmedmoreno.com",
    phone: "(786) 288-6761",
    website: "https://hazmedmoreno.com",
    github: "@hmorlive",
  },
  skills: [
    { skill: "Javascript", id: "fe35f809-b6c9-427d-974c-8de6f89e456e" },
    { skill: "NodeJS", id: "754c2816-236f-4216-a4c4-230ffdf29a20" },
    { skill: "React | NextJS", id: "45d078e0-8efc-4c86-868c-4d5885c44eca" },
    { skill: "Angular", id: "unique-id-angular" },
    { skill: "TypeScript", id: "unique-id-typescript" },
    { skill: "HTML", id: "b1c82b1e-3fca-4b7b-ae0f-8f8f0d4a8c41" },
    { skill: "CSS | TailwindCSS", id: "e741f929-6d50-4602-9896-173cfc785694" },
    { skill: "Python", id: "f9b14705-ca69-47d1-82c7-d16d62535e30" },
    { skill: "Java", id: "dc2c93ec-799f-4b33-ab8a-381cbde9c0de" },
    { skill: "PHP", id: "dc2c93ec-799f-4b33-ab8a-381cbde9c0de" },
    {
      skill: "AWS (EC2, Lambda, DynamoDB, S3, CloudFront)",
      id: "7e2d3968-138a-4ab7-9061-dbd365699d72",
    },
    { skill: "Linux", id: "f945d73f-746b-4b7d-87d7-e62998d1979c" },
    {
      skill: "Nginx | Apache2 | OpenResty",
      id: "e741f929-6d50-4602-9896-173cfc785695",
    },
    { skill: "MongoDB", id: "a3533ef2-7100-4981-bcae-006bf6df8831" },
    { skill: "SQL", id: "d720b972-7891-4d2d-a10b-f030d7db1f7d" },
    { skill: "Git", id: "e741f929-6d50-4602-9896-173cfc788494" },
    { skill: "Docker", id: "f2c1b4dd-935e-4c3b-bf89-4e9e5c577f4b" },
    { skill: "RESTful APIs", id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p" },
    { skill: "Testing", id: "dc2c93ec-799f-4b33-ab8a-381cbde9c0de" },
    { skill: "OAuth & JWT", id: "4p3o2n1m-9i8h7g-6f5e-4d3c-2b1a0z" },
    {
      skill: "Agile Methodologies",
      id: "3fd7c930-9c8a-4b18-9f8c-4e7c2514f3c8",
    },
    { skill: "Electron", id: "unique-id-electron" },
    { skill: "Responsive Design", id: "d039df3f-4295-4334-b75e-250a6b2876c8" },
    { skill: "Accessible Design", id: "bc0f66ab-18a6-441d-bb7e-bd46b47f880f" },
    { skill: "Security Best Practices", id: "unique-id-security-practices" },
    { skill: "Package Managers (npm/Yarn)", id: "unique-id-npm-yarn" },
  ],
  languages: [
    { language: "English", id: "dc45748e-4faa-4dcb-b0d6-9a7538921202" },
    { language: "Spanish", id: "8f7b9421-c292-4976-93b6-a668a603b788" },
  ],
  education: [
    {
      name: "MS Applied Computer Science",
      date: "2022-08-30",
      institution: "Frostburg State University",
      location: "Frostburg, MD",
      id: "520652ee-cb9d-4760-8a82-43704c803bb7",
    },
    {
      name: "MBA",
      date: "2020-05-01",
      institution: "Barry University",
      location: "Miami Shores, FL",
      id: "ce7fdedf-0b72-4d3f-87d1-877578d38989",
    },
    {
      name: "BAS Applied Computer Science",
      date: "",
      institution: "Miami Dade College",
      location: "Miami, FL",
      id: "5403b7d4-c18c-4713-981d-1eab7de6b890",
    },
  ],
  experience: [
    {
      title: "Software Engineer (Self Employed)",
      company: "Full Summit LLC",
      from: "2019-05-01",
      to: "",
      keypoints: [
        "Develops robust apps, automates business processes, and enhances efficiency.",
        "Collaborates closely with clients for tailored solutions.",
        "Ensures top-notch performance, scalability, and security. Utilizes cloud solutions as required.",
        "Implements secure RESTful APIs.",
        "Rigorously test reliability of software.",
        "Use Git for efficient code management.",
      ],
      id: "a5da6ff0-4a13-4937-9d3c-300b6aec10ee",
    },
  ],
  projects: [
    {
      name: "Streamlined Resume",
      date: "2023-12-10",
      url: "streamlinedresume.com",
      description:
        "Developed an app to showcase my coding skills, using it to create this resume. Handled design, development, and testing. Utilized NextJS for the frontend, implemented a serverless backend with AWS Lambda, and exported the client to S3, served via AWS Cloudfront. Managed DNS configuration.",
      id: "5e1ac5bb-dd0f-4d2e-8433-423050668463",
    },
    {
      name: "Automated Mail Parsing and Invoicing",
      date: "",
      url: "",
      description:
        "Developed an Electron, Node.js, and AngularJS desktop application, transforming a company's manual invoicing and order management into an efficient, automated process. The app intelligently updates orders from email data, leveraging Tesseract.js for OCR in PDF data extraction. Implemented MongoDB for secure data storage, simplifying the manual workflow while ensuring data integrity. This solution significantly boosted workflow efficiency and tackled Electron’s library compatibility challenges.",
      id: "c3effde6-1176-4376-9710-07c180661e7d",
    },
    {
      name: "Full Summit (Main Site)",
      date: "",
      url: "fullsummit.us",
      description:
        "Developed Full Summit's main website using NextJS, tailored for peak performance and a serverless architecture. Integrated TailwindCSS for sleek, responsive design. Leveraged AWS Lambda, API Gateway, S3, and Cloudfront for efficient, scalable content delivery. Focused heavily on performance optimization, achieving high PageSpeed Insights scores, showcasing a commitment to speed and user experience.",
      id: "3e25303d-8ffe-45a9-a9d0-e22cbeac13e1",
    },
  ],
};

//missing fields
const missingFieldsData = {
  contact: {
    // Missing name and title
  },
  skills: [
    {
      /* Missing skill */
    },
    { skill: "React" },
  ],
};

//exceeding length
const exceedingLengthData = {
  contact: {
    name: "This is a very long name that exceeds twenty-five characters",
    title: "Senior Software Developer and Architect",
  },
  skills: [{ skill: "A very long skill name that exceeds the maximum length" }],
  // Other sections are omitted for brevity
};

module.exports = {
  completeData,
  missingFieldsData,
  exceedingLengthData,
};
