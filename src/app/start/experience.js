import {
  faPlusCircle,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "./shared/modal";
import ErrorContainer from "./shared/error-container";

//Experience Component
export default function ExperienceSection({
  visible = false,
  toggleShowAddExperience,
  add,
  remove,
  currentData,
  allowNew,
}) {
  //manage field errors
  const [errors, setErrors] = useState({});

  //manage state of experience fields
  const [data, setData] = useState({
    title: "",
    company: "",
    from: "",
    to: "",
    keypoints: "",
    id: uuidv4(),
  });

  //handle change in input
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    if (e.target.length > 0) {
      isInputValid(e.target.name);
    }
    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  //pass to parent array
  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!validateData()) return;
    data.keypoints = data.keypoints
      .split("&")
      .map((keypoint) => keypoint.trim()); // Trim to remove any leading/trailing whitespace
    add(data);
    setData({
      title: "",
      company: "",
      from: "",
      to: "",
      keypoints: "",
      id: uuidv4(),
    });
    toggleShowAddExperience(); //close modal
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
    if ((input === 'title' || input === 'company') && !value) {
      newErrors[input] = true;
      return false;
    }
    newErrors[input] = false;
    return true;
  };

  //resets error prop
  const resetErrors = (errorName) => (e) => {
    e.preventDefault();
    setErrors({...errors, [errorName]: false});
  };

  //remove element from experience array
  const handleRemove = (id) => (e) => {
    e.preventDefault();
    remove(id);
  };

  return (
    <div className="flex flex-col w-[250px] max-w-full gap-2">
      <h2 className="resume-section">experience</h2>
      {currentData.length > 0 ? (
        currentData.map((data) => (
          <div className="my-2 flex flex-col shadow p-2" key={data.id}>
            <span className="font-bold text-sm">{data.title || null}</span>
            <div className="text-xs">
              <span className="font-light text-sm">{data.company || null}</span>
              <span className="font-light italic">
                {" "}
                {(data.from && data.from + "-") || null}
                {data.to || "Current"}
              </span>
            </div>
            {data.keypoints && data.keypoints.length > 1 && (
              <ul className="font-light flex flex-col list-disc ml-4 text-sm">
                {data.keypoints.map((keypoint, index) => (
                  <li key={index}>
                    {keypoint || null}
                  </li>
                ))}
              </ul>
            )}
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
            onClick={toggleShowAddExperience}
            aria-label="close add work experience modal"
            className="close-btn"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="border-l-4 pl-2 border-orange-700">Add Experience</h2>
          <label>
            title
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={data.title}
              maxLength={50}
              className={errors.title ? '!border-red-600' : null}
            />
          </label>
          {errors.title && (
            <ErrorContainer
              error={"title field should not be empty"}
              resetError={resetErrors('title')}
            ></ErrorContainer>
          )}
          <label>
            company
            <input
              type="text"
              name="company"
              onChange={handleChange}
              value={data.company}
              maxLength={50}
              className={errors.company ? '!border-red-600' : null}
            />
          </label>
          {errors.company && (
            <ErrorContainer
              error={"company field should not be empty"} 
              resetError={resetErrors('company')}
            ></ErrorContainer>
          )}
          <label>
            from
            <input
              type="date"
              name="from"
              onChange={handleChange}
              value={data.from}
            />
          </label>
          <label>
            to (if blank defaults to &quot;Current&quot;)
            <input
              type="date"
              name="to"
              onChange={handleChange}
              value={data.to}
            />
          </label>
          <label>
            keypoints (separate with &)
            <textarea
              name="keypoints"
              onChange={handleChange}
              value={data.keypoints}
              maxLength={500}
            />
          </label>
          <button className="section-part-btn" onClick={handleAddExperience}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>Add</span>
          </button>
        </Modal>
      ) : allowNew() ? (
        <button className="section-add-btn" onClick={toggleShowAddExperience}>
          <FontAwesomeIcon icon={faPlusCircle} />
          Add Experience
        </button>
      ) : (
        <span>Max reached (3)</span>
      )}
    </div>
  );
}
