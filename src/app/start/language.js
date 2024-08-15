import {
  faPlusCircle,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ErrorContainer from "./shared/error-container";

//language component
export default function LanguageSection({
  add,
  remove,
  currentData,
  allowNew
}) {
  //manage state of language fields
  const [data, setData] = useState({
    language: "",
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
    if (data.language.length === 0 || data.language.length > 15) {
      setError(true);
      return;
    }
    add(data);
    setData({
      language: "",
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
      <h2 className="resume-section mb-2">languages</h2>
      {currentData && currentData.length > 0 ? (
        <div className="flex gap-2">
          {currentData.map((data) => (
            <div
              key={data.id}
              className="flex flex-row flex-wrap w-fit items-center justify-center gap-1 bg-gray-50 font-bold text-xs text-slate-900 p-1 rounded-md"
            >
              <span>{data.language}</span>
              <button
                onClick={handleRemove(data.id)}
                aria-label="remove language"
              >
                <FontAwesomeIcon icon={faTrashAlt} size="xs" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <span className="empty-section-text">Nothing to show here.</span>
      )}
      {allowNew() ? (
        <div className="flex flex-wrap">
          <label>
            language
            <input
              type="text"
              name="language"
              onChange={handleChange}
              value={data.language}
              className={`${error ? "!border-red-500" : null}`}
            />
          </label>
          <button
            onClick={handleAddLanguage}
            className="font-light text-sm text-slate-900 flex items-center justify-center gap-1"
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            Add Language
          </button>
        </div>
      ) : (
        <span>Max reached (5)</span>
      )}
      {error && (
        <ErrorContainer
          error={"language field should not be empty"}
          resetError={resetError}
        />
      )}
    </div>
  );
}
