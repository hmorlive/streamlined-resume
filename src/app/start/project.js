import {
  faPlusCircle,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "./shared/modal";

// Projects Component
export default function ProjectsSection({
  visible = false,
  toggleShowAddProject,
  add,
  remove,
  currentData,
  allowNew = true,
}) {
  //manage state of project fields
  const [data, setData] = useState({
    name: "",
    date: "",
    url: "",
    description: "",
    id: uuidv4(),
  });

  //handle change in input
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //pass to parent array
  const handleAddProject = (e) => {
    e.preventDefault();
    add(data);
    setData({
      name: "",
      date: "",
      url: "",
      description: "",
      id: uuidv4(),
    });
    toggleShowAddEducation(); //close modal
  };

  const handleRemove = (id) => (e) => {
    e.preventDefault();
    remove(id);
  };
  return (
    <>
      <h2 className="resume-section">projects</h2>
      {currentData && <></>}
      {visible ? (
        <Modal>
          <button
            aria-label="close add project modal"
            onClick={toggleShowAddProject}
            className="close-btn"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="border-l-4 pl-2 border-orange-700">Add Project</h2>
          <label>
            project name
            <input
              type="text"
              name="projectName"
              required
              maxLength={50}
              onChange={handleChange}
              value={data.name}
            />
          </label>
          <label>
            project date
            <input
              type="date"
              name="projectDate"
              required
              maxLength={50}
              onChange={handleChange}
              value={data.date}
            />
          </label>
          <label>
            project url
            <input
              type="text"
              name="projectURL"
              required
              maxLength={50}
              onChange={handleChange}
              value={data.date}
            />
          </label>
          <label>
            project description
            <textarea
              type="text"
              name="projectDescription"
              required
              maxLength={50}
              onChange={handleChange}
              value={data.date}
            />
          </label>
          <button className="section-part-btn" onClick={handleAddProject}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>Add</span>
          </button>
        </Modal>
      ) : allowNew ? (
        <button className="section-add-btn" onClick={toggleShowAddProject}>
          <FontAwesomeIcon icon={faPlusCircle} />
          Add Project
        </button>
      ) : (
        <span>Max reached (3)</span>
      )}
    </>
  );
}
