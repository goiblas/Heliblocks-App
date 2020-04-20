import React, { useState, Suspense, lazy, useContext } from "react";
import { useHistory } from "react-router-dom";
import Loading from "./../../components/loading";
import { setHeliblock } from "./../../services/heliblocks"
import { addHeliblockToUser } from "./../../services/users"
import { AuthContext } from "./../../services/auth"


const Editor = lazy(() =>
  import(/* webpackChunkName: "editor" */ "../../components/editor")
);

const Create = () => {
  const history = useHistory();
  const [ saving, setSaving ] = useState(false)
  const { user } = useContext(AuthContext)

  const onSave = async( heliblock ) => {
    setSaving(true)

    let heliblockId;
    try {
      heliblockId = await setHeliblock({
        ...heliblock,
        author: user.uid,
        lastUpdate: new Date(),
        createdAt: new Date()
      });
      await addHeliblockToUser(user.uid, heliblockId)
    } catch (error) {
      console.log(error)
    }

    setSaving(false)
    if(heliblockId){
      history.push(`/heliblock/${heliblockId}`);
    }
  }
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Editor onSave={ onSave } saving={saving} />
      </Suspense>
    </>
  );
};
export default Create;
