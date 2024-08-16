import { Field, FieldArray, ErrorMessage } from "formik";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";

export default function ProjectsSection({ values }) {
  return (
    <FieldArray name="projects">
      {({ push, remove }) => (
        <div>
          {values.projects.map((_, index) => (
            <div key={index} className="flex gap-4 flex-wrap">
              <div>
                <label htmlFor={`projects[${index}].name`}>Project Name</label>
                <Field
                  name={`projects[${index}].name`}
                  type="text"
                  className="input-field"
                />
                <ErrorMessage
                  name={`projects[${index}].name`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div>
                <label htmlFor={`projects[${index}].url`}>Project URL</label>
                <Field
                  name={`projects[${index}].url`}
                  type="url"
                  className="input-field"
                />
                <ErrorMessage
                  name={`projects[${index}].url`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div>
                <label htmlFor={`projects[${index}].date`}>Completion Date</label>
                <Field
                  name={`projects[${index}].date`}
                  type="date"
                  className="input-field"
                />
                <ErrorMessage
                  name={`projects[${index}].date`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div className="w-full">
                <label htmlFor={`projects[${index}].description`}>
                  Description
                </label>
                <Field
                  name={`projects[${index}].description`}
                  as="textarea"
                  className="input-field"
                />
                <ErrorMessage
                  name={`projects[${index}].description`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-50 text-red-700 text-xs rounded p-2 flex h-fit items-center justify-center gap-2"
                >
                  <IoMdTrash size="1.2em" className="inline-block" />
                  Remove Project
                </button>
              )}
            </div>
          ))}
          {values.projects.length < 3 && (
            <button
              type="button"
              onClick={() =>
                push({
                  name: "",
                  url: "",
                  date: "",
                  description: "",
                })
              }
              className="p-2 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 text-xs rounded"
            >
              <IoMdAddCircle size="1.2em" className="inline-block" />
              Add Project
            </button>
          )}
        </div>
      )}
    </FieldArray>
  );
}
