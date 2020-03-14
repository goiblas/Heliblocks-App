import React, { Suspense, lazy, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../components/loading";
import NotFound from "../notFound";
import { saveCreation, getCreationById } from "./../../store/creation/actions";
import { ProtectedButton } from "./../../components/menus";
const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const EditCreation = ({ creation, auth, getCreationById, save }) => {
  const { heliblockId } = useParams();

  useEffect(() => {
    getCreationById(heliblockId);
  }, []);

  if (creation.notFound) {
    return <NotFound />;
  }

  if (!creation || !auth.isLoaded) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Editor action={ 
          <ProtectedButton
            onClick={save}
            disabled={!creation.hasUnsavedChanges}
          >
            Save
          </ProtectedButton>} />
    </Suspense>
  );
};

const mapStateToProps = (state, ownProps) => ({
  creation: state.creation,
  auth: state.firebase.auth
});

const mapDispatchToProps = dispatch => ({
  getCreationById: id => dispatch(getCreationById(id)),
  save: id => dispatch(saveCreation())
});
export default connect(mapStateToProps, mapDispatchToProps)(EditCreation);
