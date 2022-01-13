import React, { useState } from "react";

function MultiSelectDropDown({ children, label }) {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="multipleSelection">
      <div
        className="selectBox"
        onClick={() => {
            setShowMenu(!showMenu);
        }}
      >
        <span>{label}</span>
        <svg
          className="chevron"
          style={{
            transform: showMenu ? "rotate(180deg)" : "none",
          }}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div
        id="checkBoxes"
        style={{ display: showMenu ? "block" : "none" }}
      >
        {children}
      </div>
    </div>
  );
}

export default MultiSelectDropDown;
