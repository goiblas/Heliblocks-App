import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "./../../components/loading";
import { saveNewCreation } from "./../../store/creation/actions";
import { ProtectedButton } from "./../../components/menus";

const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const Create = ({ auth, creation, save }) => {
  const history = useHistory();

  if (creation.id) {
    history.push(`/heliblock/${creation.id}`);
  }

  if (!auth.isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Editor action={ 
          <ProtectedButton
            onClick={save}
            disabled={!creation.hasUnsavedChanges}
          >
            Save
          </ProtectedButton>} />
      </Suspense>
    </>
  );
};
Create.prototype = {
  create: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  auth: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  creation: state.creation
});

const mapDispathToProps = dispatch => ({
  save: () => dispatch(saveNewCreation())
});
export default connect(mapStateToProps, mapDispathToProps)(Create);
