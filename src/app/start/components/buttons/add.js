import { IoMdAddCircle } from "react-icons/io";

/**
 * Renders an Add Button
 * @param {Function} onClickHandler - Function to handle the button click
 * @param {String} label - Text to display on the button
 * @param {String} title - Tooltip text and aria-label for accessibility
 * @returns {JSX.Element} Add button component
 */
export default function AddButton({ onClickHandler = () => {}, label = "Add", title = "Add Item" }) {
  return (
    <button
      onClick={onClickHandler}
      title={title}
      aria-label={title}
      className="font-light bg-slate-200 rounded p-2 text-sm text-slate-900 flex items-center justify-center gap-1"
    >
      <IoMdAddCircle size={"1.2em"} />
      {label}
    </button>
  );
}
