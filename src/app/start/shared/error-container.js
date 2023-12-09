import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//error container
export default function ErrorContainer({error, resetError}) {
  return (<div className="error-container">
    <span>{error || 'there is an error in this form'}</span>
    <button onClick={resetError} aria-label="hide error">
      <FontAwesomeIcon icon={faTimes} size="sm" />
    </button>
  </div>);
}
