import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
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
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    marginBottom: 24,
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
    fontSize: 10,
    marginBottom: 4,
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
            <Text style={styles.text}>{contact?.summary || ""}</Text>
          </View>

          <View>
            <Text style={styles.header}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.sectionItem}>
                <Text style={styles.sectionTitle}>{edu.degree}</Text>
                <View style={styles.sectionInline}>
                  <Text style={styles.text}>{edu.institution}</Text>
                  {edu.location && <Text style={styles.text}>-</Text>}
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
                {new Date(exp.from).toLocaleDateString()} -{" "}
                {exp.to ? new Date(exp.to).toLocaleDateString() : "Present"}
              </Text>
              <MarkdownRenderer markdownText={exp.keypoints} />
            </View>
          ))}

          <View>
            <Text style={styles.header}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.sectionItem}>
                <Text style={styles.sectionTitle}>{project.name}</Text>
                {project.date && <Text style={styles.sectionDate}>
                  {new Date(project.date).toLocaleDateString()}
                </Text>}
                <MarkdownRenderer markdownText={project.description} />
              </View>
            ))}
            </View>
        </View>

        <View style={styles.columnTwo}>
          <Text style={styles.header}>Contact</Text>
          <Text style={styles.text}>{contact.email}</Text>
          <Text style={styles.text}>{contact.location}</Text>
          <Text style={styles.text}>{contact.github}</Text>
          <Text style={styles.text}>{contact.website}</Text>

          <Text style={styles.header}>Skills</Text>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.text}>
              {skill}
            </Text>
          ))}

          <Text style={styles.header}>Languages</Text>
          {languages.map((language, index) => (
            <Text key={index} style={styles.text}>
              {language}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
