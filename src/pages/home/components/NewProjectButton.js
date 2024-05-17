import React, { useEffect } from "react";

function NewProjectButton(props) {
  const { isViewAddProjectField, setIsViewAddProjectField } = props;

  const toggleAddProject = () => {
    if (isViewAddProjectField) {
      document.getElementById("addNewProjectField").style.display = "flex";
      document.getElementById("addNewProjectField").style.animation =
        "field-open-anim 0.4s forwards";
    } else {
      document.getElementById("addNewProjectField").style.animation =
        "field-close-anim 0.25s forwards";
    }
  };

  useEffect(() => {
    toggleAddProject();
  }, [isViewAddProjectField]);

  return (
    <button
      className={
        isViewAddProjectField ? "button orange-button" : "button blue-button"
      }
      onClick={() => setIsViewAddProjectField(!isViewAddProjectField)}
    >
      {isViewAddProjectField ? "Hide -" : "New Project +"}
    </button>
  );
}

export default NewProjectButton;
