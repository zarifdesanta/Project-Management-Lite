import React, { useEffect } from "react";

import { toggleView } from "../../utils/Common";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function ToggleViewButton({
  buttonName,
  isView,
  setIsView,
  divId,
  cssDisplay,
  activeButtonClass = "orange-button",
  notActiveButtonClass = "blue-button",
}) {
  //   const { buttonName, isView, setIsView, divId, cssDisplay } = props;

  useEffect(() => {
    toggleView(isView, divId, cssDisplay);
  }, [isView]);

  return (
    <button
      className={
        isView ? "button " + "white-button" : "button " + notActiveButtonClass
      }
      onClick={() => setIsView(!isView)}
    >
      {isView ? (
        <>
          <span style={{ verticalAlign: "middle", marginRight: "4px" }}>
            Hide
          </span>
          <FaMinus size={12} style={{ verticalAlign: "middle" }}></FaMinus>
        </>
      ) : (
        <>
          <span style={{ verticalAlign: "middle", marginRight: "4px" }}>
            {buttonName}
          </span>
          <FaPlus size={12} style={{ verticalAlign: "middle" }}></FaPlus>
        </>
      )}
    </button>
  );
}

export default ToggleViewButton;
