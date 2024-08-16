import { FieldArray, Field, ErrorMessage } from "formik";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";

export default function LanguagesSection({ values }) {
  return (
    <FieldArray name="languages" className="gap-2">
      {({ push, remove }) => (
        <div>
          {values.languages.map((_, index) => (
            <div key={index} className="flex gap-4 flex-wrap">
              <div>
                <Field
                  name={`languages[${index}]`}
                  type="text"
                  placeholder="Language"
                  className="input-field"
                />
                <ErrorMessage
                  name={`languages[${index}]`}
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
                  Remove Language
                </button>
              )}
            </div>
          ))}
          {values.languages.length < 10 && (
            <button
              type="button"
              onClick={() => push("")}
              className="mt-2 p-2 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 text-xs rounded"
            >
              <IoMdAddCircle size="1.2em" className="inline-block" />
              Add Language
            </button>
          )}
        </div>
      )}
    </FieldArray>
  );
}
