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

// details needed to generate resume
export default function ResumeDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false); //manage state of form submission
  const [promptConfirmation, setPromptConfirmation] = useState(true); //prompt user to confirm if some important sections blank
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); //state of user confirmation modal

  const [showAddExperience, setShowAddExperience] = useState(false); //manage state of add experience modal
  const [showAddEducation, setShowAddEducation] = useState(false); //manage state of add education modal
  const [showAddProject, setShowAddProject] = useState(false); //manage state of add project modal

  const [userContact, setuserContact] = useState({}); // keep track of user skills
  const [userSkills, setUserSkills] = useState([]); // keep track of user skills
  const [userExperience, setUserExperience] = useState([]); // keep track of user experience
  const [userEducation, setUserEducation] = useState([]); // keep track of user education
  const [userProject, setUserProject] = useState([]); // keep track of user projects
  const [userLanguages, setUserLanguages] = useState([]); // keep track of user languages

  //add new user section part
  const addContactInfo = (data) => {
    setuserContact(data);
  };
  const addUserSkills = (data) => {
    setUserSkills([...userSkills, data]);
  };
  const addUserExperience = (data) => {
    setUserExperience([...userExperience, data]);
  };
  const addUserEducation = (data) => {
    setUserEducation([...userEducation, data]);
  };
  const addUserProject = (data) => {
    setUserProject([...userProject, data]);
  };
  const addUserLanguage = (data) => {
    setUserLanguages([...userLanguages, data]);
  };

  //determine if new allowed
  const shouldAllowNewSkill = () => {
    return userSkills.length < 20;
  };
  const shouldAllowNewExperience = () => {
    return userExperience.length < 3;
  };
  const shouldAllowNewEducation = () => {
    return userEducation.length < 3;
  };
  const shouldAllowNewProject = () => {
    return userProject.length < 3;
  };
  const shouldAllowNewLanguage = () => {
    return userLanguages.length < 5;
  };

  //remove items in sections
  const removeSkills = (id) => {
    try {
      const newSkill = userSkills.filter((item) => item.id !== id);
      setUserSkills(newSkill);
    } catch (error) {
      //later ? log error or display err message, omitting for now
    }
  };
  const removeExperience = (id) => {
    try {
      const newExperience = userExperience.filter((item) => item.id !== id);
      setUserExperience(newExperience);
    } catch (error) {
      //later ? log error or display err message, omitting for now
    }
  };
  const removeEducation = (id) => {
    try {
      const newEducation = userEducation.filter((item) => item.id !== id);
      setUserEducation(newEducation);
    } catch {
      //later ? log error or display err message, omitting for now
    }
  };
  const removeProject = (id) => {
    try {
      const newProject = userProject.filter((item) => item.id !== id);
      setUserProject(newProject);
    } catch {
      //later ? log error or display err message, omitting for now
    }
  };
  const removeLanguage = (id) => {
    try {
      const newLanguage = userLanguages.filter((item) => item.id !== id);
      setUserLanguages(newLanguage);
    } catch (error) {
      //later ? log error or display err message, omitting for now
    }
  };

  const isImportantSectionBlank = () => {
    if (
      promptConfirmation &&
      (userSkills.length === 0 ||
        userEducation.length === 0 ||
        userExperience.length === 0 ||
        userLanguages.length === 0 ||
        userProject.length === 0)
    ) {
      return true;
    }
    return false;
  };

  //actually submit the fomr
  const performSubmission = () => {
    setIsSubmitting(true);
    //prepare submission
    const submissionData = {
      contact: userContact,
      skills: userSkills,
      languages: userLanguages,
      education: userEducation,
      experience: userExperience,
      projects: userProject
    }
  };

  //initiate submission and toggle confirmation
  const submitDetails = (e) => {
    e.preventDefault();
    return toggleConfirmationModal();
  };

  //user acceptance of form
  const acceptAsIs = () => {
    setPromptConfirmation(false);
    toggleConfirmationModal();
    performSubmission();
  };

  //toggles visibility of add modals
  const toggleShowAddExperience = (e) => {
    setShowAddExperience(!showAddExperience);
  };
  const toggleShowAddEducation = (e) => {
    setShowAddEducation(!showAddEducation);
  };
  const toggleShowAddProject = (e) => {
    setShowAddProject(!showAddProject);
  };

  //toggles visibility of confirmation modal
  const toggleConfirmationModal = (e) => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  //loading screen while resume is being generated
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
    <section className="flex container items-center justify-center flex-col p-4 gap-4 mx-auto my-10 max-w-full flex-wrap box-border">
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
          ) :         <>
          <h2 className="border-l-4 pl-2 border-green-700">Confirm</h2>
          <p>Please make sure everything looks correct.</p>
        </> }
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
      <form className="flex flex-col gap-4 max-w-full" onSubmit={submitDetails}>
        <h1 className="text-xl mb-1 text-left w-full">Your Details</h1>
        <hr className="divider" />
        <ContactInfoSection add={addContactInfo} />
        <hr className="divider" />
        <div className="flex flex-wrap w-full gap-4">
          <SkillsSection
            allowNew={shouldAllowNewSkill}
            remove={removeSkills}
            add={addUserSkills}
            currentData={userSkills}
          />
          <LanguageSection
            allowNew={shouldAllowNewLanguage}
            remove={removeLanguage}
            add={addUserLanguage}
            currentData={userLanguages}
          />
        </div>
        <hr className="divider" />
        <div className="flex flex-wrap w-full gap-4">
          <ProjectsSection
            visible={showAddProject}
            allowNew={shouldAllowNewProject}
            add={addUserProject}
            remove={removeProject}
            toggleShowAddProject={toggleShowAddProject}
            currentData={userProject}
          />
          <EducationSection
            visible={showAddEducation}
            allowNew={shouldAllowNewEducation}
            add={addUserEducation}
            remove={removeEducation}
            toggleShowAddEducation={toggleShowAddEducation}
            currentData={userEducation}
          />
          <ExperienceSection
            visible={showAddExperience}
            allowNew={shouldAllowNewExperience}
            remove={removeExperience}
            add={addUserExperience}
            toggleShowAddExperience={toggleShowAddExperience}
            currentData={userExperience}
          />
        </div>
        <hr className="divider" />
        <button
          type="submit"
          className="action-btn flex gap-1 items-center justify-center"
        >
          Generate Resume
        </button>
      </form>
    </section>
  );
}
