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

// Education Component
export default function EducationSection({
  visible = false,
  toggleShowAddEducation,
  add,
  remove,
  currentData,
  allowNew,
}) {
  //manage field errors
  const [errors, setErrors] = useState({});

  //manage state of education fields
  const [data, setData] = useState({
    name: "",
    date: "",
    institution: "",
    location: "",
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
  const handleAddEducation = (e) => {
    e.preventDefault();
    if (!validateData()) return;
    add(data);
    setData({
      name: "",
      date: "",
      institution: "",
      location: "",
      id: uuidv4(),
    });
    toggleShowAddEducation(); //close modal
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
    if ((input === "name" || input === "institution") && !value) {
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
      <h2 className="resume-section">education</h2>
      {currentData.length > 0 ? (
        currentData.map((data) => (
          <div className="my-2 flex flex-col shadow p-2" key={data.id}>
            <span className="font-bold text-sm">{data.name || null}</span>
            <div className="text-xs">
              <span className="font-light text-sm">
                {data.institution || null}
              </span>
              {data.date && (
                <span className="font-light italic">
                  {" "}
                  {" - "}
                  {new Date(data.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  }) || null}
                </span>
              )}
            </div>
            {data.location.length > 0 && (
              <span className="text-xs font-semibold">
                {data.location || null}
              </span>
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
            onClick={toggleShowAddEducation}
            aria-label="close add work education modal"
            className="close-btn"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="border-l-4 pl-2 border-orange-700">Add Education</h2>
          <label>
            degree/certification name
            <input
              type="text"
              name="name"
              required
              maxLength={30}
              onChange={handleChange}
              value={data.name}
              className={errors.name ? "!border-red-600" : null}
            />
          </label>
          {errors.name && (
            <ErrorContainer
              error={"degree/certification field should not be empty"}
              resetError={resetErrors("name")}
            ></ErrorContainer>
          )}
          <label>
            completion date
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={data.date}
            />
          </label>
          <label>
            institution
            <input
              type="text"
              name="institution"
              maxLength={30}
              onChange={handleChange}
              value={data.institution}
              className={errors.institution ? "!border-red-600" : null}
            />
          </label>
          {errors.institution && (
            <ErrorContainer
              error={"institution field should not be empty"}
              resetError={resetErrors("institution")}
            ></ErrorContainer>
          )}
          <label>
            location
            <input
              type="text"
              name="location"
              maxLength={30}
              onChange={handleChange}
              value={data.location}
            />
          </label>
          <button className="section-part-btn" onClick={handleAddEducation}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>Add</span>
          </button>
        </Modal>
      ) : allowNew() ? (
        <button className="section-add-btn" onClick={toggleShowAddEducation}>
          <FontAwesomeIcon icon={faPlusCircle} />
          Add Education
        </button>
      ) : (
        <span>Max reached (3)</span>
      )}
    </div>
  );
}
