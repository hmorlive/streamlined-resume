import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import ReactMarkdown from "react-markdown";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    display: "flex",
    fontFamily: "Times-Roman",
  },
  columnOne: {
    width: "70%",
    padding: "5%",
  },
  columnTwo: {
    width: "30%",
    height: "80%",
    backgroundColor: "#f0f0f0",
    gap: 20,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    paddingVertical: 30,
  },
  name: {
    fontSize: 24,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  header: {
    fontSize: 8,
    fontWeight: "light",
    textTransform: "uppercase",
    marginBottom: 4,
    marginTop: 10,
  },
  sectionItem: {
    marginVertical: 2,
  },
  sectionInline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 2,
    fontFamily: "Times-Bold",
    fontWeight: "bold",
  },
  sectionLocation: {
    fontSize: 10,
    textDecoration: "oblique",
    fontFamily: "Times-Italic",
  },
  sectionDate: {
    fontSize: 10,
    textDecoration: "italic",
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    marginVertical: 4,
  },
  flatText: {
    fontSize: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  listItem: {
    fontSize: 10,
    display: "flex",
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletPoint: {
    width: 10,
  },
  contactBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    gap: 4,
    marginVertical: 2,
  },
});

const MarkdownRenderer = ({ markdownText }) => {
  const components = {
    strong: ({ children }) => <Text style={styles.bold}>{children}</Text>,
    li: ({ children }) => (
      <View style={styles.listItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text>{children}</Text>
      </View>
    ),
    p: ({ children }) => <Text style={styles.text}>{children}</Text>,
  };

  return <ReactMarkdown components={components}>{markdownText}</ReactMarkdown>;
};

const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumberString; // Return the original string if formatting fails
};

const PhoneNumber = ({ contact }) => {
  return <Text style={styles.text}>{formatPhoneNumber(contact.phone)}</Text>;
};

const ResumePDF = ({ data }) => {
  const contact = data?.contact || {};
  const education = data?.education || [];
  const experience = data?.experience || [];
  const projects = data?.projects || [];
  const skills = data?.skills || [];
  const languages = data?.languages || [];

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.columnOne}>
          <Text style={styles.name}>{contact?.name || ""}</Text>
          <Text style={styles.title}>{contact?.title || ""}</Text>

          <View>
            <Text style={styles.flatText}>{contact?.summary || ""}</Text>
          </View>

          <View>
            <Text style={styles.header}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.sectionItem}>
                <Text style={styles.sectionTitle}>{edu.degree}</Text>
                <View style={styles.sectionInline}>
                  <Text style={styles.flatText}>{edu.institution}</Text>
                  {edu.location && <Text style={styles.flatText}>-</Text>}
                  <Text style={styles.sectionLocation}>{edu.location}</Text>
                  {edu.date && (
                    <Text style={styles.sectionDate}>
                      {new Date(edu.date).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.header}>Experience</Text>
          {experience.map((exp, index) => (
            <View key={index}>
              <View style={styles.sectionInline}>
                <Text style={styles.sectionTitle}>{exp.title}</Text>
                <Text style={styles.text}>- {exp.company}</Text>
              </View>
              <Text style={styles.sectionDate}>
                {new Date(exp.from).toLocaleDateString("en-US", {
                  timeZone: "UTC",
                })}{" "}
                -{" "}
                {exp.to
                  ? new Date(exp.to).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                    })
                  : "Present"}
              </Text>
              <MarkdownRenderer markdownText={exp.keypoints} />
            </View>
          ))}

          <View>
            <Text style={styles.header}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.sectionItem}>
                <Text style={styles.sectionTitle}>{project.name}</Text>
                {project.date && (
                  <Text style={styles.sectionDate}>
                    {new Date(project.date).toLocaleDateString()}
                  </Text>
                )}
                <MarkdownRenderer markdownText={project.description} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.columnTwo}>
          <View>
            <Text style={styles.header}>Contact</Text>
            {contact.phone && (
              <View style={styles.contactBox}>
                <Image src={"/phone.png"} style={{ width: 8 }} />
                <PhoneNumber contact={contact} />
              </View>
            )}
            {contact.email && (
              <View style={styles.contactBox}>
                <Image src={"/envelope.png"} style={{ width: 8 }} />
                <Text style={styles.text}>{contact.email}</Text>
              </View>
            )}
            {contact.location && (
              <View style={styles.contactBox}>
                <Image src={"/pin.png"} style={{ width: 8 }} />
                <Text style={styles.text}>{contact.location}</Text>
              </View>
            )}
            {contact.github && (
              <View style={styles.contactBox}>
                <Image src={"/github-mark.png"} style={{ width: 8 }} />
                <Text style={styles.text}>{contact.github}</Text>
              </View>
            )}
            {contact.website && (
              <View style={styles.contactBox}>
                <Image src={"/web.png"} style={{ width: 8 }} />
                <Text style={styles.text}>{contact.website}</Text>
              </View>
            )}
          </View>

          <View>
            <Text style={styles.header}>Skills</Text>
            {skills.map((skill, index) => (
              <Text key={index} style={styles.text}>
                • {skill}
              </Text>
            ))}
          </View>

          <View>
            <Text style={styles.header}>Languages</Text>
            {languages.map((language, index) => (
              <Text key={index} style={styles.text}>
                {language}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
