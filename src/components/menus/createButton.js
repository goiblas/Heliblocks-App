import React from "react";
import { connect } from "react-redux";
import { initializeCreation } from "./../../store/creation/actions";
import { useHistory } from "react-router-dom";

const CreateButton = ({ initialize }) => {
  const history = useHistory();

  const newCreation = ev => {
    ev.preventDefault();
    initialize();
    history.push("/create");
  };
  return (
    <a href="#" onClick={newCreation}>
      Create
    </a>
  );
};

const mapDispathToProps = {
  initialize: initializeCreation
};
export default connect(null, mapDispathToProps)(CreateButton);
