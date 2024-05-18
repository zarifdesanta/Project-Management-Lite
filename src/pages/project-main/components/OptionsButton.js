import React, { useEffect } from "react";

import { toggleView } from "../../../utils/Common";

function OptionsButton(props) {
  const { isViewOptionsField, setIsViewOptionsField } = props;

  useEffect(() => {
    toggleView(isViewOptionsField, "options", "flex");
  }, [isViewOptionsField]);

  return (
    <button
      className={
        isViewOptionsField
          ? "button orange-button option-button"
          : "button option-button"
      }
      onClick={() => setIsViewOptionsField(!isViewOptionsField)}
    >
      {isViewOptionsField ? "Options -" : "Options"}
    </button>
  );
}

export default OptionsButton;
