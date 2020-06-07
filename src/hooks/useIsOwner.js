import { useState, useEffect, useContext } from "react";
import { AuthContext } from "services/auth";
import { getUser } from "services/users";

export const useIsOwner = id => {
  const [state, setState] = useState({ isLoaded: false, isOwner: null });
  const { isLoaded, user } = useContext(AuthContext);

  const checkIsOwner = async (userId, heliblockId) => {
    const { heliblocks } = await getUser(userId);

    if (heliblocks && heliblocks.includes(heliblockId)) {
      setState({ isLoaded: true, isOwner: true });
    } else {
      setState({ isLoaded: true, isOwner: false });
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!user) {
      setState({ isLoaded: true, isOwner: false });
      return;
    }

    checkIsOwner(user.uid, id);
  }, [isLoaded, user, id]);

  return state;
};
