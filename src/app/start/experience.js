import { faPlusCircle, faTrashAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "./shared/modal";

//Experience Component
export default function ExperienceSection({
    visible = false,
    toggleShowAddExperience,
    add,
    remove,
    currentData,
    allowNew = true,
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
      id: uuidv4()
    });
  
    //handle change in input
    const handleChange = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
      setErrors({
        ...errors,
        [e.target.name]: false
      })
    };
  
    //pass to parent array
    const handleAddExperience = (e) => {
      e.preventDefault();
      (data.keypoints = data.keypoints
        .split("&")
        .map((keypoint) => keypoint.trim())), // Trim to remove any leading/trailing whitespace
        add(data);
      validateData();
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

    const validateData = () => {
      if (!data.title) {
        setErrors({...errors, "title": true});
        return false;
      }
    }
  
    const handleRemove = (id) => (e) => {
      e.preventDefault();
      remove(id);
    };
  
    return (
      <>
        <h2 className="resume-section">experience</h2>
        {currentData.length > 0 ? (
          currentData.map((data) => (
            <div className="my-2 flex flex-col gap-2 shadow p-2" key={data.id}>
              <span className="font-bold text-sm">{data.title || null}</span>
              <div className="text-xs">
                <span className="font-light text-sm">{data.company || null}</span>
                <span className="font-light italic">
                  {" "}
                  {data.from || null} - {data.to || "Current"}
                </span>
              </div>
              {data.keypoints && data.keypoints.length > 1 && (
                <ul className="font-light flex flex-col list-disc ml-4 text-sm">
                  {data.keypoints.map((keypoint, index) => (
                    <li key={index}>
                      {keypoint || null}
                      {data.keypoints.length}
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={handleRemove(data.id)}
                className="section-part-btn"
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
              />
            </label>
            <label>
              company
              <input
                type="text"
                name="company"
                onChange={handleChange}
                value={data.company}
                maxLength={50}
              />
            </label>
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
              to (if blank defaults to "Current")
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
              />
            </label>
            <button className="section-part-btn" onClick={handleAddExperience}>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>Add</span>
            </button>
          </Modal>
        ) : allowNew ? (
          <button className="section-add-btn" onClick={toggleShowAddExperience}>
            <FontAwesomeIcon icon={faPlusCircle} />
            Add Experience
          </button>
        ) : (
          <span>Max reached (3)</span>
        )}
      </>
    );
  }