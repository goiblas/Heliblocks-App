import React, { useState, Suspense, lazy, useContext } from "react";
import { useHistory } from "react-router-dom";
import Loading from "components/loading";
import { addHeliblock } from "services/heliblocks";
import { addHeliblockToUser } from "services/users";
import { AuthContext } from "services/auth";

const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const Create = () => {
  const history = useHistory();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const { user } = useContext(AuthContext);

  const setNewHeliblock = async heliblock => {
    let heliblockId;
    try {
      heliblockId = await addHeliblock({
        ...heliblock,
        author: user.uid,
        lastUpdate: new Date(),
        createdAt: new Date()
      });
      await addHeliblockToUser(user.uid, heliblockId);
    } catch (error) {
      // @TODO
    }

    if (heliblockId) {
      history.push(`/edit/${heliblockId}`);
    }
  };

  const onSave = async heliblock => {
    setSaving(true);
    await setNewHeliblock(heliblock);
    setSaving(false);
  };

  const onPublish = async heliblock => {
    setPublishing(true);
    await setNewHeliblock(heliblock);
    setPublishing(false);
  }

  const initialValues = {
    title: "Untitled",
    description: "",
    tags: [],
    alignment: "normal",
    author: null,
    html: "",
    css: "",
    additionalLinks: "",
    draft: true
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Editor 
          onSave={onSave}
          saving={saving}
          onPublish={onPublish}
          publishing={publishing}
          {...initialValues}
        />
      </Suspense>
    </>
  );
};
export default Create;
