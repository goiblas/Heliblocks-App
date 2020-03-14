import React from "react";
import { Link } from "react-router-dom";

const CreationList = ({ creations }) => {
  return (
    <div className="project-list section">
      {creations &&
        creations.map((heliblock, key) => (
          <Link
            to={"/heliblock/" + heliblock.id}
            className="card z-depth-0 heliblock-summary"
            key={key}
          >
            <div className="card-content grey-text text-darken-3">
              <span className="card-title ">{heliblock.title}</span>
              <p className="grey-text">FEcha</p>
            </div>
          </Link>
        ))}
    </div>
  );
};
export default CreationList;
