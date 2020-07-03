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
  const { user } = useContext(AuthContext);

  const onSave = async heliblock => {
    setSaving(true);

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

    setSaving(false);

    if (heliblockId) {
      history.push(`/edit/${heliblockId}`);
    }
  };
  const initialValues = {
    title: "Untitled",
    description: "",
    tags: [],
    alignment: "normal",
    author: null,
    html: "",
    css: "",
    additionalLinks: ""
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Editor onSave={onSave} saving={saving} {...initialValues} />
      </Suspense>
    </>
  );
};
export default Create;
