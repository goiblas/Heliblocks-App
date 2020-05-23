import React, { Suspense, lazy, useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import Loading from "../../components/loading";
import NotFound from "../notFound";
import { getHeliblock } from "./../../services/heliblocks"
import useIsOwner from "./useIsOwner";

const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const heliblockToEditorProps = response => ({
  title: response.title,
  description: response.description,
  tags: response.tags,
  theme: response.theme,
  alignment: response.alignment,
  html: response.html,
  css: response.css,
  author: response.author
}) 

const EditCreation = () => {
  const { heliblockId } = useParams();
  const { isLoaded, isOwner } = useIsOwner(heliblockId)
  const [ heliblock, setHeliblock ] = useState(null);
  const [ saving, setSaving ] =  useState(false);

  useEffect(() => {
    getHeliblock(heliblockId)
            .then( setHeliblock)
            .catch( error => {
              // TODO
            });
  }, [heliblockId]);

  if (!heliblock || !isLoaded)  {
    return <Loading />;
  }

  if (heliblock.notFound) {
    return <NotFound />;
  }

  if(!isOwner) {
    return <Redirect to="/" />
  }

  const onSave = async( heliblock ) => {
    setSaving(true)
    try {
      await setHeliblock( heliblockId, { ...heliblock, lastUpdate: new Date() });
    } catch (error) {
      // @TODO
    }
    setSaving(false)
  }

  const editorProps = heliblockToEditorProps(heliblock)

  return (
    <Suspense fallback={<Loading />}>
      <Editor {...editorProps} id={heliblockId} saving={saving} onSave={onSave} />
    </Suspense>
  );
};

export default EditCreation;
