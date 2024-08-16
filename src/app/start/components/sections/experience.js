import { Field, FieldArray, ErrorMessage } from "formik";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";

export default function ExperienceSection({ values }) {
  return (
    <FieldArray name="experience">
      {({ push, remove }) => (
        <div>
          {values.experience.map((_, index) => (
            <div key={index} className="flex gap-4 flex-wrap">
              <div>
                <label htmlFor={`experience[${index}].title`}>Job Title</label>
                <Field
                  name={`experience[${index}].title`}
                  type="text"
                  className="input-field"
                />
                <ErrorMessage
                  name={`experience[${index}].title`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div>
                <label htmlFor={`experience[${index}].company`}>Company</label>
                <Field
                  name={`experience[${index}].company`}
                  type="text"
                  className="input-field"
                />
                <ErrorMessage
                  name={`experience[${index}].company`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div>
                <label htmlFor={`experience[${index}].from`}>From</label>
                <Field
                  name={`experience[${index}].from`}
                  type="date"
                  className="input-field"
                />
                <ErrorMessage
                  name={`experience[${index}].from`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div>
                <label htmlFor={`experience[${index}].to`}>To</label>
                <Field
                  name={`experience[${index}].to`}
                  type="date"
                  className="input-field"
                />
                <ErrorMessage
                  name={`experience[${index}].to`}
                  component="div"
                  className="p-1 text-red-600 rounded text-xs border border-red-600"
                />
              </div>
              <div className="w-full">
                <label htmlFor={`experience[${index}].keypoints`}>
                  Keypoints
                </label>
                <Field
                  name={`experience[${index}].keypoints`}
                  as="textarea"
                  className="input-field"
                />
                <ErrorMessage
                  name={`experience[${index}].keypoints`}
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
                  Remove Experience
                </button>
              )}
            </div>
          ))}
          {values.experience.length < 3 && (
            <button
              type="button"
              onClick={() =>
                push({
                  title: "",
                  company: "",
                  from: "",
                  to: "",
                  keypoints: "",
                })
              }
              className="p-2 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 text-xs rounded"
            >
              <IoMdAddCircle size="1.2em" className="inline-block" />
              Add Experience
            </button>
          )}
        </div>
      )}
    </FieldArray>
  );
}
