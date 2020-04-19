import React, { useState, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
import Loading from "./../../components/loading";

const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const Create = () => {
  const history = useHistory();
  const [ saving, setSaving ] = useState(false)

  const onSave = ( heliblock) => {
    // save then recive id 
    // id  push to edit url
    console.log('save..')
    console.log(heliblock)
    //history.push(`/heliblock/${creationId}`);
  }
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Editor onSave={ onSave } />
      </Suspense>
    </>
  );
};
export default Create;
