import React, { Suspense, lazy, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../components/loading";
import NotFound from "../notFound";
import { getCreationById } from "./../../store/creation/actions";

const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const EditCreation = ({ creation, auth, getCreationById }) => {
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
      <Editor />
    </Suspense>
  );
};

const mapStateToProps = (state, ownProps) => ({
  creation: state.creation,
  auth: state.firebase.auth
});

const mapDispatchToProps = dispatch => ({
  getCreationById: id => dispatch(getCreationById(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditCreation);
