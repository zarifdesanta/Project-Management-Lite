import React, { useEffect } from "react";

import { toggleView } from "../../../utils/Common";

function NewTaskButton(props) {
  //   const [isViewInputField, setIsViewInputField] = useState(false);

  const { isViewInputField, setIsViewInputField } = props;

  useEffect(() => {
    toggleView(isViewInputField, "fields", "grid");
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
