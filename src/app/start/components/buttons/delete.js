import { IoMdTrash } from "react-icons/io";

/**
 * Renders a Delete Button
 * @param {Function} onClickHandler - on click handler
 * @param {String} title - used to set label and title
 * @param {String} data - data to display
 * @returns 
 */
export default function DeleteButton({ onClickHandler = () => {}, title = "Remove", data = "" }) {
  return (
    <button
      title={title}
      onClick={onClickHandler}
      className="flex gap-2 bg-slate-100 text-slate-600 text-xs p-2 rounded items-center justify-center"
      aria-label={title}
    >
      <span>{data}</span>
      <IoMdTrash size={"1.2em"} />
    </button>
  );
}
