import {
  faPlusCircle,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "./shared/modal";
import ErrorContainer from "./shared/error-container";

// Projects Component
export default function ProjectsSection({
  visible = false,
  toggleShowAddProject,
  add,
  remove,
  currentData,
  allowNew,
}) {
  //manage field errors
  const [errors, setErrors] = useState({});

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
    if (!validateData()) return;
    add(data);
    setData({
      name: "",
      date: "",
      url: "",
      description: "",
      id: uuidv4(),
    });
    toggleShowAddProject(); //close modal
  };

  //validate provided data
  const validateData = () => {
    let isValid = true;
    const newErrors = { ...errors };
    for (const key in data) {
      if (!isInputValid(key, data[key], newErrors)) {
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  //check if given input is valid
  const isInputValid = (input, value, newErrors) => {
    if (input === "name" && !value) {
      newErrors[input] = true;
      return false;
    }
    newErrors[input] = false;
    return true;
  };

  //resets error prop
  const resetErrors = (errorName) => (e) => {
    e.preventDefault();
    setErrors({ ...errors, [errorName]: false });
  };

  //handle removal of element from array
  const handleRemove = (id) => (e) => {
    e.preventDefault();
    remove(id);
  };
  return (
    <div className="flex flex-col w-[250px] max-w-full gap-2">
      <h2 className="resume-section">projects</h2>
      {currentData.length > 0 ? (
        currentData.map((data) => (
          <div className="mb-2 flex flex-col shadow p-2" key={data.id}>
            <div className="flex flex-wrap gap-1 items-center">
              <span className="font-bold text-sm my-1">
                {data.name || null}
              </span>{" "}
              <span className="font-light italic text-xs">
                {" - "}
                {data.date}
              </span>
            </div>
            <div className="text-xs">
              <span className="font-light text-sm">
                {data.description || null}
              </span>
            </div>
            {data.url && <span className="text-xs">
              <strong>url</strong>: {data.url}
            </span>}
            <button
              onClick={handleRemove(data.id)}
              className="section-add-btn"
            >
              <FontAwesomeIcon icon={faTrashAlt} size="xs" />
              Remove
            </button>
          </div>
        ))
      ) : (
        <span className="empty-section-text">Nothing to show here.</span>
      )}
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
              name="name"
              required
              maxLength={50}
              onChange={handleChange}
              value={data.name}
              className={errors.name ? '!border-red-600' : null}
            />
          </label>
          {errors.name && (
            <ErrorContainer
              error={"project name field should not be empty"}
              resetError={resetErrors("name")}
            ></ErrorContainer>
          )}
          <label>
            project date
            <input
              type="date"
              name="date"
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
              name="url"
              required
              maxLength={50}
              onChange={handleChange}
              value={data.url}
            />
          </label>
          <label>
            project description
            <textarea
              type="text"
              name="description"
              required
              maxLength={50}
              onChange={handleChange}
              value={data.description}
            />
          </label>
          <button className="section-part-btn" onClick={handleAddProject}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>Add</span>
          </button>
        </Modal>
      ) : allowNew() ? (
        <button className="section-add-btn" onClick={toggleShowAddProject}>
          <FontAwesomeIcon icon={faPlusCircle} />
          Add Project
        </button>
      ) : (
        <span>Max reached (3)</span>
      )}
    </div>
  );
}
