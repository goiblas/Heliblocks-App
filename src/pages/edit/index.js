import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import NotFound from "../notFound";
import { getHeliblock } from "./../../services/heliblocks"
const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const EditCreation = () => {
  const { heliblockId } = useParams();
  const [ heliblock, setHeliblock ] =  useState(null);

  useEffect(() => {
    getHeliblock(heliblockId)
            .then( setHeliblock)
            .catch( error => {
              // @TODO send to sentry.io ¿?
            });
  }, [heliblockId]);

  if (!heliblock) {
    return <Loading />;
  }

  if (heliblock.notFound) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Editor />
    </Suspense>
  );
};

export default EditCreation;
