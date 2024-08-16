import { Field, FieldArray, ErrorMessage } from "formik";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";

export default function EducationSection({ values }) {
  return (
    <FieldArray name="education">
      {({ push, remove }) => (
        <div>
          {/* Display the "Add Education" button only if there are no entries */}
          {values.education.length === 0 && (
            <button
              type="button"
              onClick={() =>
                push({
                  degree: "",
                  institution: "",
                  location: "",
                  date: "",
                })
              }
              className="p-2 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 text-xs rounded"
            >
              <IoMdAddCircle size="1.2em" className="inline-block" />
              Add Education
            </button>
          )}

          {/* Display the education fields only if there's data */}
          {values.education.map((education, index) => (
            <div key={index} className="flex gap-4 flex-wrap mt-4">
              <div>
                <label htmlFor={`education[${index}].degree`}>Degree</label>
                <Field
                  name={`education[${index}].degree`}
                  type="text"
                  className="input-field"
                />
                <ErrorMessage
                  name={`education[${index}].degree`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div>
                <label htmlFor={`education[${index}].institution`}>
                  Institution
                </label>
                <Field
                  name={`education[${index}].institution`}
                  type="text"
                  className="input-field"
                />
                <ErrorMessage
                  name={`education[${index}].institution`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div>
                <label htmlFor={`education[${index}].location`}>Location</label>
                <Field
                  name={`education[${index}].location`}
                  type="text"
                  className="input-field"
                />
                <ErrorMessage
                  name={`education[${index}].location`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div>
                <label htmlFor={`education[${index}].date`}>
                  Completion Date
                </label>
                <Field
                  name={`education[${index}].date`}
                  type="date"
                  className="input-field"
                />
                <ErrorMessage
                  name={`education[${index}].date`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-50 text-red-700 text-xs rounded p-2 flex h-fit my-auto items-center justify-center gap-2"
              >
                <IoMdTrash size="1.2em" className="inline-block" />
                Remove Education
              </button>
            </div>
          ))}

          {/* Display the "Add Another Education" button only if there's already one entry and less than 3 */}
          {values.education.length > 0 && values.education.length < 3 && (
            <button
              type="button"
              onClick={() =>
                push({
                  degree: "",
                  institution: "",
                  location: "",
                  date: "",
                })
              }
              className="p-2 mt-4 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 text-xs rounded"
            >
              <IoMdAddCircle size="1.2em" className="inline-block" />
              Add Another Education
            </button>
          )}
        </div>
      )}
    </FieldArray>
  );
}
