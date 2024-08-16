"use client";
import { useState, useEffect, use } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ContactSection from "./components/sections/contact";
import EducationSection from "./components/sections/education";
import ExperienceSection from "./components/sections/experience";
import ProjectsSection from "./components/sections/projects";
import SkillsSection from "./components/sections/skills";
import LanguagesSection from "./components/sections/languages";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./components/renderer/render";

export default function ResumeForm() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [formData, setFormData] = useState(null); // Add state for form data

  const sections = [
    { id: "contact", label: "Contact Information", component: ContactSection },
    { id: "education", label: "Education", component: EducationSection },
    { id: "experience", label: "Experience", component: ExperienceSection },
    { id: "projects", label: "Projects", component: ProjectsSection },
    { id: "skills", label: "Skills", component: SkillsSection },
    { id: "languages", label: "Languages", component: LanguagesSection },
  ];

  const storedData =
    typeof window !== "undefined" ? localStorage.getItem("resumeFormData") : null;

  const initialValues = storedData
    ? JSON.parse(storedData)
    : {
        contact: {
          name: "",
          email: "",
          phone: "",
          location: "",
          github: "",
          website: "",
          summary: "",
        },
        education: [],
        projects: [],
        experience: [],
        languages: [],
        skills: [],
      };

  const validationSchema = Yup.object({
    contact: Yup.object({
      name: Yup.string().required("Name is required"),
      title: Yup.string().required("Title is required"),
      phone: Yup.string().matches(
        /^\d{10}$/,
        "Enter a valid 10-digit phone number"
      ),
      email: Yup.string().email("Invalid email address"),
      location: Yup.string(),
      github: Yup.string().matches(/^@[\w-]+$/, "Enter a valid GitHub handle."),
      website: Yup.string().url("Invalid URL"),
      summary: Yup.string(),
    }),
    education: Yup.array().of(
      Yup.object({
        degree: Yup.string(),
        institution: Yup.string(),
        location: Yup.string(),
        date: Yup.date(),
      })
    ),
    experience: Yup.array().of(
      Yup.object({
        title: Yup.string().required("Job title is required"),
        company: Yup.string().required("Company name is required"),
        from: Yup.date().required("Start date is required"),
        to: Yup.date().required("End date is required"),
        keypoints: Yup.string(),
      })
    ),
    projects: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Project name is required"),
        date: Yup.date().required("Completion date is required"),
        description: Yup.string().required("Project description is required"),
        url: Yup.string().url("Invalid URL"),
      })
    ),
    skills: Yup.array()
      .of(Yup.string().required("Skill is required"))
      .min(1, "At least one skill is required"),
    languages: Yup.array()
      .of(Yup.string().required("Language is required"))
      .min(1, "At least one language is required"),
  });

  const onSubmit = (values) => {
    setFormData(values);
    localStorage.setItem("resumeFormData", JSON.stringify(values));
    console.log("Form data", values);
  };

  const nextSection = () => {
    if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
    }
  };

  const previousSection = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
    }
  };

  const getProgressPercentage = () => {
    return ((sectionIndex + 1) / sections.length) * 100;
  };

  const sectionHasErrors = (sectionId, errors) => {
    return Object.keys(errors).some((errorKey) =>
      errorKey.startsWith(sectionId)
    );
  };

  const clearStorage = () => {
    localStorage.removeItem("resumeFormData");
    window.location.reload();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting, errors, setFieldValue }) => {
        const CurrentSection = sections[sectionIndex].component;

        // save form data to local storage
        useEffect(() => {
          localStorage.setItem("resumeFormData", JSON.stringify(values));
        }, [values]);

        return (
          <Form className="flex flex-col gap-4 w-full max-w-6xl mx-auto p-4 my-8">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>

            {/* Section Navigation */}
            <div className="flex justify-between md:items-center gap-4 mb-4 flex-col md:flex-row">
              <h2 className="text-xl font-semibold">
                {sections[sectionIndex].label}
              </h2>
              <div className="flex flex-wrap gap-2 flex-col md:flex-row">
                {sections.map((section, index) => (
                  <span
                    key={section.id}
                    className={`px-2 py-1 cursor-pointer ${
                      index === sectionIndex
                        ? "text-blue-700"
                        : sectionHasErrors(section.id, errors)
                        ? "text-red-700"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSectionIndex(index)}
                  >
                    {section.label}
                  </span>
                ))}
              </div>
            </div>

            <CurrentSection values={values} setFieldValue={setFieldValue} />

            <div className="flex justify-between mt-4 flex-wrap flex-col md:flex-row gap-4">
              {sectionIndex > 0 && (
                <button
                  type="button"
                  onClick={previousSection}
                  className="bg-gray-600 hover:bg-gray-700 w-32 sm:w-40 text-white px-4 sm:px-6 py-3 text-sm rounded"
                >
                  Previous
                </button>
              )}

                  <button
                    type="button"
                    onClick={() => setFormData(values)} // Set formData to preview the PDF
                    className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 w-32 sm:w-40 text-white px-4 sm:px-6 py-3 text-sm rounded"
                  >
                    Preview
                  </button>

              {sectionIndex < sections.length - 1 && (
                <button
                  type="button"
                  onClick={nextSection}
                  className="bg-blue-600 hover:bg-blue-700 w-32 sm:w-40 text-white px-4 sm:px-6 py-3 text-sm rounded"
                >
                  Next
                </button>
              
              )}
              <button
                type="button"
                onClick={clearStorage}
                className="bg-red-600 hover:bg-red-700 w-32 sm:w-40 text-white px-4 sm:px-6 py-3 text-sm rounded"
              >
                Clear Data
              </button>
            </div>

            {formData && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold">Preview and Download</h2>
                <div className="flex flex-col gap-4">
                  <PDFViewer width="100%" height="1200">
                    <ResumePDF data={formData} />
                  </PDFViewer>
                  <PDFDownloadLink
                    document={<ResumePDF data={formData} />}
                    fileName="resume.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Download Resume"
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}