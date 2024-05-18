import React, { useEffect } from "react";

import { toggleView } from "../../../utils/Common";

function NewProjectButton(props) {
  const { isViewAddProjectField, setIsViewAddProjectField } = props;

  useEffect(() => {
    toggleView(isViewAddProjectField, "addNewProjectField", "flex");
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
