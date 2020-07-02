import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import Loading from "components/loading";
import NotFound from "pages/notFound";
import { getHeliblock, setHeliblock } from "services/heliblocks";
import { useIsOwner } from "hooks";

const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "components/editor")
);

const heliblockToEditorProps = response => ({
  title: response.title,
  description: response.description,
  tags: response.tags,
  alignment: response.alignment,
  html: response.html,
  css: response.css,
  additionalLinks: response.additionalLinks
});

const EditCreation = () => {
  const { heliblockId } = useParams();
  const { isLoaded, isOwner } = useIsOwner(heliblockId);
  const [currentHeliblock, setCurrentHeliblock] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getHeliblock(heliblockId)
      .then(setCurrentHeliblock)
      .catch(error => {
        // @TODO
      });
  }, [heliblockId]);

  if (!currentHeliblock || !isLoaded) {
    return <Loading />;
  }

  if (currentHeliblock.notFound) {
    return <NotFound />;
  }

  if (!isOwner) {
    return <Redirect to="/" />;
  }

  const onSave = async heliblock => {
    setSaving(true);
    try {
      await setHeliblock(heliblockId, { ...heliblock, lastUpdate: new Date() });
    } catch (error) {
      // @TODO
    }
    setSaving(false);
  };
  const editorProps = heliblockToEditorProps(currentHeliblock);

  return (
    <Suspense fallback={<Loading />}>
      <Editor
        {...editorProps}
        id={heliblockId}
        saving={saving}
        onSave={onSave}
      />
    </Suspense>
  );
};

export default EditCreation;
