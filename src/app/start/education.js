import { faPlusCircle, faTrashAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "./shared/modal";

// Education Component
export default function EducationSection({
    visible = false,
    toggleShowAddEducation,
    add,
    remove,
    currentData,
    allowNew = true,
  }) {
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
  
    const handleRemove = (id) => (e) => {
      e.preventDefault();
      remove(id);
    };
    return (
      <>
        <h2 className="resume-section">education</h2>
        {currentData.length > 0 ? (
          currentData.map((data) => (
            <div className="my-2 flex flex-col gap-2 shadow p-2" key={data.id}>
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
              <span className="text-xs font-semibold">
                {data.location || null}
              </span>
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
          <div className="w-full h-full fixed flex items-center justify-center left-0 top-0 z-20 bg-gray-200 bg-opacity-70">
            <div className="w-[500px] max-w-[90vw] relative shadow px-8 py-4 bg-white rounded-md  flex flex-col gap-2">
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
                  maxLength={50}
                  onChange={handleChange}
                  value={data.name}
                />
              </label>
              <label>
                completion date
                <input
                  type="date"
                  name="date"
                  maxLength={50}
                  onChange={handleChange}
                  value={data.date}
                />
              </label>
              <label>
                institution
                <input
                  type="text"
                  name="institution"
                  maxLength={50}
                  onChange={handleChange}
                  value={data.institution}
                />
              </label>
              <label>
                location
                <input
                  type="text"
                  name="location"
                  maxLength={50}
                  onChange={handleChange}
                  value={data.location}
                />
              </label>
              <button className="section-part-btn" onClick={handleAddEducation}>
                <FontAwesomeIcon icon={faPlusCircle} />
                <span>Add</span>
              </button>
            </div>
          </div>
        ) : allowNew ? (
          <button className="section-add-btn" onClick={toggleShowAddEducation}>
            <FontAwesomeIcon icon={faPlusCircle} />
            Add Education
          </button>
        ) : (
          <span>Max reached (3)</span>
        )}
      </>
    );
  }