import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "./../../components/loading";

const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const Create = ({ auth, creationId }) => {
  const history = useHistory();

  if (creationId) {
    history.push(`/heliblock/${creationId}`);
  }

  if (!auth.isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Editor />
      </Suspense>
    </>
  );
};
Create.prototype = {
  create: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  creationId: state.creation.id
});

export default connect(mapStateToProps)(Create);
