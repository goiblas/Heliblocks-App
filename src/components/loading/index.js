import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <svg viewBox="0 0 50 50" className="spinner-loading" shapeRendering="auto" data-testid="loading">
      <circle
        className="spinner-loading__path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default Loading;
