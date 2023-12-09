"use client";
import { useState } from "react";
import LanguageSection from "./language";
import ExperienceSection from "./experience";
import EducationSection from "./education";

// details needed to generate resume
export default function ResumeDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false); //manage state of form submission

  const [showAddExperience, setShowAddExperience] = useState(false); //manage state of add experience modal
  const [showAddEducation, setShowAddEducation] = useState(false); //manage state of add education modal
  const [showAddProject, setShowAddProject] = useState(false); //manage state of add project modal

  const [userSkills, setUserSkills] = useState([]); // keep track of user skills
  const [userExperience, setUserExperience] = useState([]); // keep track of user experience
  const [userEducation, setUserEducation] = useState([]); // keep track of user education
  const [userProject, setUserProject] = useState([]); // keep track of user projects
  const [userLanguages, setUserLanguages] = useState([]); // keep track of user languages

  //add new user section part
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
    setUserProject([...data, data]);
  };
  const addUserLanguage = (data) => {
    setUserLanguages([...userLanguages, data]);
  };

  //determine if new allowed
  const shouldAllowNewSkill = () => {
    return userExperience.length < 20;
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
      setUserExperience(newSkill);
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

  /**
   *  Submit form for resume generation
   * @returns true if submission succeeds;false otherwise
   */
  const submitDetails = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    return true; //if submission succeeds
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

  //loading screen while resume is being generated
  if (isSubmitting) {
    return (
      <div className="z-20 fixed left-0 top-0 w-full h-full bg-gray-200 bg-opacity-70 flex items-center justify-center">
        <div className="w-fit px-6 py-4 flex gap-2 items-center justify-center font-light text-slate-900">
          <span className="w-4 h-4 border-l-2 border-slate-900 flex animate-spin rounded-full"></span>
          <span>Generating Resume</span>
        </div>
      </div>
    );
  }

  return (
    <section className="flex container items-center justify-center flex-col p-10 gap-4 mx-auto my-1">
      <form className="flex flex-col gap-4">
        <h1 className="text-xl mb-1 text-left w-full">Your Details</h1>
        <hr className="divider" />
        <ContactInfoSection />
        <hr className="divider" />
        <ProjectsSection
          visible={showAddProject}
          allowNew={shouldAllowNewProject}
          add={addUserProject}
          remove={removeProject}
          toggleShowAddProject={toggleShowAddProject}
          currentData={userProject}
        />
        <hr className="divider" />
        <EducationSection
          visible={showAddEducation}
          allowNew={shouldAllowNewEducation}
          add={addUserEducation}
          remove={removeEducation}
          toggleShowAddEducation={toggleShowAddEducation}
          currentData={userEducation}
        />
        <hr className="divider" />
        <ExperienceSection
          visible={showAddExperience}
          allowNew={shouldAllowNewExperience}
          remove={removeExperience}
          add={addUserExperience}
          toggleShowAddExperience={toggleShowAddExperience}
          currentData={userExperience}
        />
        <hr className="divider" />
        <LanguageSection
          allowNew={shouldAllowNewLanguage}
          remove={removeLanguage}
          add={addUserLanguage}
          currentData={userLanguages}
        />
        <hr className="divider" />
        <button
          onClick={submitDetails}
          type="submit"
          className="action-btn flex gap-1 items-center justify-center"
        >
          Generate Resume
        </button>
      </form>
    </section>
  );
}