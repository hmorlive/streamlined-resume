"use client";
import { useState } from "react";
import LanguageSection from "./language";
import ExperienceSection from "./experience";
import EducationSection from "./education";
import SkillsSection from "./skills";
import ContactInfoSection from "./contact";
import ProjectsSection from "./project";
import Modal from "./shared/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ResumeDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promptConfirmation, setPromptConfirmation] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [generationError, setGenerationError] = useState(false);
  const [documentAvailable, setDocumentAvailable] = useState(false);
  const [stage, setStage] = useState("basic");
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  const [userData, setUserData] = useState({
    contact: {},
    skills: [],
    experience: [],
    education: [],
    projects: [],
    languages: [],
  });

  // Handle navigation between stages
  const nextStage = () => {
    const stages = [
      "basic",
      "skills",
      "languages",
      "experience",
      "education",
      "projects",
    ];
    const currentStageIndex = stages.indexOf(stage);
    if (currentStageIndex < stages.length - 1) {
      setStage(stages[currentStageIndex + 1]);
    }
  };

  const prevStage = () => {
    const stages = [
      "basic",
      "skills",
      "languages",
      "experience",
      "education",
      "projects",
    ];
    const currentStageIndex = stages.indexOf(stage);
    if (currentStageIndex > 0) {
      setStage(stages[currentStageIndex - 1]);
    }
  };

  // Add new user section part
  const updateUserData = (section, data, append = false) => {
    setUserData((prevData) => ({
      ...prevData,
      [section]: append ? [...prevData[section], data] : data,
    }));
  };

  // Determine if new items are allowed
  const shouldAllowNewItem = (section, maxItems) => {
    return userData[section].length < maxItems;
  };

  // Remove items in sections
  const removeItem = (section, id) => {
    setUserData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((item) => item.id !== id),
    }));
  };

  const isImportantSectionBlank = () => {
    if (
      promptConfirmation &&
      (userData.skills.length === 0 ||
        userData.education.length === 0 ||
        userData.experience.length === 0 ||
        userData.languages.length === 0 ||
        userData.projects.length === 0)
    ) {
      return true;
    }
    return false;
  };

  // Send the submission data to the backend
  const performSubmission = async () => {
    setIsSubmitting(true);
    downloadPDF(userData);
  };

  // Allow PDF download
  async function downloadPDF(data) {
    try {
      const response = await fetch(
        "https://bqgv7cf5ol.execute-api.us-east-1.amazonaws.com/v1/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error();
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "resume.pdf";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      setDocumentAvailable(true);
    } catch (error) {
      setGenerationError(true);
    }
  }

  const submitDetails = (e) => {
    e.preventDefault();
    toggleConfirmationModal();
  };

  const acceptAsIs = () => {
    setPromptConfirmation(false);
    toggleConfirmationModal();
    performSubmission();
  };

  const toggleVisibility = (setter) => {
    setter((prevState) => !prevState);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal((prevState) => !prevState);
  };

  if (documentAvailable) {
    return (
      <section className="w-full min-h-[70vh] flex flex-col justify-center items-center">
        <div className="flex flex-col w-fit gap-2 p-4">
          <h1 className="pl-2 border-l-8 border-green-600">
            That&apos;s it! Your resume is ready.
          </h1>
          <p className="text-lg">Hope it helps you in your journey.</p>
        </div>
      </section>
    );
  }

  if (generationError) {
    return (
      <section className="w-full min-h-[70vh] flex flex-col justify-center items-center">
        <div className="flex flex-col w-fit gap-2 p-4">
          <h1 className="pl-2 border-l-8 border-red-600">
            Huh, there was an Error generating your resume.
          </h1>
          <p className="text-lg">
            Accept our apologies. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (isSubmitting) {
    return (
      <div className="z-20 fixed left-0 top-0 w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="w-fit px-6 py-4 flex gap-2 items-center justify-center font-light text-slate-900">
          <span className="w-4 h-4 border-l-2 border-slate-900 flex animate-spin rounded-full"></span>
          <span>Generating Resume</span>
        </div>
      </div>
    );
  }

  return (
    <section className="flex container items-center justify-center flex-col p-4 gap-4 mx-auto my-10 max-w-full h-fullflex-wrap box-border">
      {showConfirmationModal && (
        <Modal>
          <button
            onClick={toggleConfirmationModal}
            aria-label="close add work experience modal"
            className="close-btn"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {isImportantSectionBlank() ? (
            <>
              <h2 className="border-l-4 pl-2 border-red-700">Warning</h2>
              <p>One or more important sections have been left blank.</p>
            </>
          ) : (
            <>
              <h2 className="border-l-4 pl-2 border-green-700">Confirm</h2>
              <p>Please make sure everything looks correct.</p>
            </>
          )}
          <div className="flex flex-wrap gap-4">
            <button onClick={acceptAsIs} className="action-btn">
              Accept as is
            </button>
            <button
              onClick={toggleConfirmationModal}
              className="py-3 px-6 border-black rounded-full border"
            >
              Go back
            </button>
          </div>
        </Modal>
      )}
      <div className="flex flex-col flex-1 h-full mx-auto w-full max-w-[800px] gap-4">
        {stage === "basic" && (
          <>
            <h1 className="text-xl mb-1 text-left w-full">Basic Information</h1>
            <hr className="divider" />
            <ContactInfoSection
              add={(data) => updateUserData("contact", data)}
            />
          </>
        )}

        {stage === "skills" && (
          <>
            <h1 className="text-xl mb-1 text-left w-full">Skills</h1>
            <hr className="divider" />
            <SkillsSection
              allowNew={() => shouldAllowNewItem("skills", 20)}
              remove={(id) => removeItem("skills", id)}
              add={(data) => updateUserData("skills", data, true)}
              currentData={userData.skills}
            />
          </>
        )}

        {stage === "languages" && (
          <>
            <h1 className="text-xl mb-1 text-left w-full">Languages</h1>
            <hr className="divider" />
            <LanguageSection
              allowNew={() => shouldAllowNewItem("languages", 5)}
              remove={(id) => removeItem("languages", id)}
              add={(data) => updateUserData("languages", data, true)}
              currentData={userData.languages}
            />
          </>
        )}

        {stage === "experience" && (
          <>
            <h1 className="text-xl mb-1 text-left w-full">Experience</h1>
            <hr className="divider" />
            <ExperienceSection
              visible={showAddExperience}
              allowNew={() => shouldAllowNewItem("experience", 3)}
              remove={(id) => removeItem("experience", id)}
              add={(data) => updateUserData("experience", data, true)}
              toggleShowAddExperience={() =>
                toggleVisibility(setShowAddExperience)
              }
              currentData={userData.experience}
            />
          </>
        )}

        {stage === "education" && (
          <>
            <h1 className="text-xl mb-1 text-left w-full">Education</h1>
            <hr className="divider" />
            <EducationSection
              visible={showAddEducation}
              allowNew={() => shouldAllowNewItem("education", 3)}
              add={(data) => updateUserData("education", data, true)}
              remove={(id) => removeItem("education", id)}
              toggleShowAddEducation={() =>
                toggleVisibility(setShowAddEducation)
              }
              currentData={userData.education}
            />
          </>
        )}

        {stage === "projects" && (
          <>
            <h1 className="text-xl mb-1 text-left w-full">Projects</h1>
            <hr className="divider" />
            <ProjectsSection
              visible={showAddProject}
              allowNew={() => shouldAllowNewItem("projects", 3)}
              add={(data) => updateUserData("projects", data, true)}
              remove={(id) => removeItem("projects", id)}
              toggleShowAddProject={() => toggleVisibility(setShowAddProject)}
              currentData={userData.projects}
            />
          </>
        )}
      </div>
      <hr className="divider" />

      <div className="flex gap-4">
        {stage !== "basic" && (
          <button className="action-btn" type="button" onClick={prevStage}>
            Previous
          </button>
        )}
        {stage !== "projects" ? (
          <button className="action-btn" type="button" onClick={nextStage}>
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="action-btn flex gap-1 items-center justify-center"
          >
            Generate Resume
          </button>
        )}
      </div>
    </section>
  );
}
