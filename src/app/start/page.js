"use client";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

/**
 * Resume Preview View
 */
export default function ResumePreview() {
  const info = {}; // keep track of user info

  //manage state of add experience modal
  const [showAddExperience, setShowAddExperience] = useState(false);

  //manage state of add education modal
  const [showAddEducation, setShowAddEducation] = useState(false);

  //manage state of add project modal
  const [showAddProject, setShowAddProject] = useState(false);

  const editBasicInfo = (name, title)  => {
    name ? info.name = name : null;
    title ? info.title = title : null;
  }

  /**
   * toggles experience section
   */
  const toggleShowAddExperience = (e) => {
    e.preventDefault(); //prevent default submission behavior
    setShowAddExperience(!showAddExperience);
  };

  /**
   * toggles education section
   */
  const toggleShowAddEducation = (e) => {
    e.preventDefault(); //prevent default submission behavior
    setShowAddEducation(!showAddEducation);
  };

  /**
   * toggles project section
   */
  const toggleShowAddProject = (e) => {
    e.preventDefault(); //prevent default submission behavior
    setShowAddProject(!showAddProject);
  };

  return (
    <section className="flex container items-center justify-center flex-col p-10 gap-4 mx-auto my-10">
      <h1 className="text-xl mb-4">Your Details</h1>
      <form className="flex flex-col gap-4">
        <ContactInfoSection />
        <hr className="divider" />
        <ProjectsSection
          visible={showAddProject}
          toggleShowAddProject={toggleShowAddProject}
        />
        <hr className="divider" />
        <EducationSection
          visible={showAddEducation}
          toggleShowAddEducation={toggleShowAddEducation}
        />
        <hr className="divider" />
        <ExperienceSection
          visible={showAddExperience}
          toggleShowAddExperience={toggleShowAddExperience}
        />
      </form>
      <hr className="divider" />
      <button className="action-btn flex gap-1 items-center justify-center">
        Generate Resume
      </button>
    </section>
  );
}

function ContactInfoSection() {
  return (
    <div className="flex w-full flex-wrap gap-10">
      <div className="flex flex-col">
        <h2 className="resume-section">basic information</h2>
        <label>
          name
          <input type="text" name="name" required maxLength={50} />
        </label>
        <label>
          title
          <input type="text" name="title" required maxLength={50} />
        </label>
      </div>
      <div className="flex flex-col">
        <h2 className="resume-section">contact information</h2>
        <label>
          location
          <input type="text" name="location" required maxLength={50} />
        </label>
        <label>
          email
          <input type="text" name="email" required maxLength={50} />
        </label>
        <label>
          phone number
          <input type="text" name="phone" required maxLength={50} />
        </label>
        <label>
          github
          <input type="text" name="github" required maxLength={50} />
        </label>
        <label>
          website url
          <input type="text" name="website" required maxLength={50} />
        </label>
      </div>
    </div>
  );
}

function ProjectsSection({ visible = false, toggleShowAddProject }) {
  return (
    <>
      <h2 className="resume-section">projects</h2>
      {visible ? (
        <>
          <div className="w-full relative shadow p-4">
            <button
              aria-label="close add project modal"
              onClick={toggleShowAddProject}
              className="close-btn"
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <label>
              project name
              <input type="text" name="projectName" required maxLength={50} />
            </label>
            <label>
              project date
              <input type="date" name="projectDate" required maxLength={50} />
            </label>
            <label>
              project url
              <input type="text" name="projectURL" required maxLength={50} />
            </label>
            <label>
              project description
              <textarea
                type="text"
                name="projectDescription"
                required
                maxLength={50}
              />
            </label>
            <button className="text-slate-900 font-extrabold text-sm">
              Add Project
            </button>
          </div>
        </>
      ) : (
        <button
          className="flex flex-wrap gap-2 items-center justify-center mr-auto"
          onClick={toggleShowAddProject}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          Add Project
        </button>
      )}
    </>
  );
}

function EducationSection({ visible = false, toggleShowAddEducation }) {
  return (
    <>
      <h2 className="resume-section">education</h2>
      {visible ? (
        <>
          <div className="w-full relative shadow p-4">
            <button
              onClick={toggleShowAddEducation}
              aria-label="close add work education modal"
              className="close-btn"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <label>
              degree/certification name
              <input type="text" name="educationName" required maxLength={50} />
            </label>
            <label>
              completion date
              <input type="date" name="educationDate" maxLength={50} />
            </label>
            <label>
              institution
              <input type="text" name="educationInstitution" maxLength={50} />
            </label>
            <label>
              location
              <input type="text" name="educationLocation" maxLength={50} />
            </label>
            <button className="text-slate-900 font-extrabold text-sm">
              Add Education
            </button>
          </div>
        </>
      ) : (
        <button
          className="flex flex-wrap gap-2 items-center justify-center mr-auto"
          onClick={toggleShowAddEducation}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          Add Education
        </button>
      )}
    </>
  );
}

function ExperienceSection({ visible = false, toggleShowAddExperience }) {
  return (
    <>
      <h2 className="resume-section">experience</h2>
      {visible ? (
        <>
          <div className="w-full relative shadow p-4">
            <button
              onClick={toggleShowAddExperience}
              aria-label="close add work experience modal"
              className="close-btn"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <label>
              title
              <input
                type="text"
                name="experienceTitle"
                required
                maxLength={50}
              />
            </label>
            <label>
              company
              <input
                type="text"
                name="experienceCompany"
                required
                maxLength={50}
              />
            </label>
            <label>
              from
              <input type="date" name="experienceFrom" />
            </label>
            <label>
              to
              <input type="date" name="experienceTo" />
            </label>
            <label>
              keypoints
              <textarea />
            </label>
            <button className="text-slate-900 font-extrabold text-sm">
              Add Experience
            </button>
          </div>
        </>
      ) : (
        <button
          className="flex flex-wrap gap-2 items-center justify-center mr-auto"
          onClick={toggleShowAddExperience}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          Add Experience
        </button>
      )}
    </>
  );
}
