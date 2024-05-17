import React, { useEffect } from "react";

function NewTaskButton(props) {
  //   const [isViewInputField, setIsViewInputField] = useState(false);

  const { isViewInputField, setIsViewInputField } = props;

  const toggleFields = () => {
    if (isViewInputField) {
      document.getElementById("fields").style.display = "grid";
      document.getElementById("fields").style.animation =
        "field-open-anim 0.4s forwards";
    } else {
      document.getElementById("fields").style.animation =
        "field-close-anim 0.25s forwards";
    }
  };

  useEffect(() => {
    toggleFields();
  }, [isViewInputField]);

  return (
    <button
      className={
        isViewInputField
          ? "button orange-button show-fields-button"
          : "button blue-button show-fields-button"
      }
      onClick={() => setIsViewInputField(!isViewInputField)}
    >
      {isViewInputField ? "Hide -" : "New +"}
    </button>
  );
}

export default NewTaskButton;
