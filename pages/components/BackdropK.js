import React from "react";

const backdrop = (props) =>
  props.show ? (
    <div className="Backdrop" onClick={props.clicked}>
      <button
        className="absolute top-4 left-4 text-white bg-transparent border-none text-lg cursor-pointer"
        onClick={props.cancelClicked}
      >
        X
      </button>
    </div>
  ) : null;
export default backdrop;
