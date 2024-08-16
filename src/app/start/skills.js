import {
  faPlusCircle,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ErrorContainer from "./shared/error-container";

//skills component
export default function SkillsSection({ add, remove, currentData, allowNew }) {
  //manage state of skill fields
  const [data, setData] = useState({
    skill: "",
    id: uuidv4(),
  });

  //manage state of error
  const [error, setError] = useState(false);

  //handle change in input
  const handleChange = (e) => {
    setError(false);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //pass to parent array
  const handleAddLanguage = (e) => {
    e.preventDefault();

    //validate field is not empty
    if (data.skill.length === 0) {
      setError(true);
      return;
    }
    add(data);
    setData({
      skill: "",
      id: uuidv4(),
    });
  };

  //resets error prop
  const resetError = () => {
    setError(false);
  };

  //handle removal of element from array
  const handleRemove = (id) => (e) => {
    e.preventDefault();
    remove(id);
  };
  return (
    <div className="flex flex-col max-w-[250px]">
      <h2 className="resume-section mb-2">skills</h2>
      {currentData && currentData.length > 0 ? (
        <div className="flex gap-2 flex-wrap">
          {currentData.map((data) => (
              <button title="Remove skill" onClick={handleRemove(data.id)} className="flex gap-2 bg-gray-100 text-gray-600  text-sm  p-1 rounded items-center justify-center " aria-label="remove skill">
                <span>{data.skill}</span>
                <FontAwesomeIcon icon={faTrashAlt} size="xs" />
              </button>
          ))}
        </div>
      ) : (
        <span className="empty-section-text">Nothing to show here.</span>
      )}
      {allowNew() ? (
        <div className="flex flex-wrap">
          <label>
            skill
            <input
              type="text"
              name="skill"
              onChange={handleChange}
              value={data.skill}
              className={`${error ? "!border-red-500" : null}`}
              maxLength={20}
            />
          </label>
          <button
            onClick={handleAddLanguage}
            className="font-light text-sm text-slate-900 flex items-center justify-center gap-1"
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            Add Skill
          </button>
        </div>
      ) : (
        <span>Max reached (20)</span>
      )}
      {error && (
        <ErrorContainer
          error={"skill field should not be empty"}
          resetError={resetError}
        />
      )}
    </div>
  );
}
