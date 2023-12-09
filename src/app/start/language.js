import { faPlusCircle, faTrashAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ErrorContainer from "./shared/error-container";

//language component
export default function LanguageSection({
  add,
  remove,
  currentData,
  allowNew = true,
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
    if (data.language.length === 0) {
      setError(true);
      return;
    }
    add(data);
    setData({
      language: "",
      id: uuidv4(),
    });
  };

  const handleRemove = (id) => (e) => {
    e.preventDefault();
    remove(id);
  };
  return (
    <>
      <h2 className="resume-section">languages (spoken)</h2>
      {currentData && (
        <div className="flex gap-2">
          {currentData.length > 0 &&
            currentData.map((data) => (
              <div className="flex flex-row flex-wrap w-fit items-center justify-center gap-1 bg-gray-50 font-bold text-xs text-slate-900 p-1 rounded-md">
                <span key={data.id}>{data.language}</span>
                <button
                  onClick={handleRemove(data.id)}
                  aria-label="remove language"
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                </button>
              </div>
            ))}
        </div>
      )}
      {allowNew() ? (
        <div className="flex">
          <label>
            language
            <input
              type="text"
              name="language"
              onChange={handleChange}
              value={data.language}
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
        <ErrorContainer error={'language field should not be empty'} setError={setError} />
      )}
    </>
  );
}
