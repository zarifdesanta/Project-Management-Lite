import React, { useEffect } from "react";

import { toggleView } from "../../../utils/Common";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function NewProjectButton(props) {
  const { isViewAddProjectField, setIsViewAddProjectField } = props;

  useEffect(() => {
    toggleView(isViewAddProjectField, "addNewProjectField", "flex");
  }, [isViewAddProjectField]);

  return (
    <button
      className="button white-button"
      onClick={() => setIsViewAddProjectField(!isViewAddProjectField)}
    >
      {isViewAddProjectField ? (
        <>
          <span style={{ verticalAlign: "middle", marginRight: "4px" }}>
            Hide
          </span>
          <FaMinus size={12} style={{ verticalAlign: "middle" }}></FaMinus>
        </>
      ) : (
        <>
          <span style={{ verticalAlign: "middle", marginRight: "4px" }}>
            New Project
          </span>
          <FaPlus size={12} style={{ verticalAlign: "middle" }}></FaPlus>
        </>
      )}
    </button>
  );
}

export default NewProjectButton;
