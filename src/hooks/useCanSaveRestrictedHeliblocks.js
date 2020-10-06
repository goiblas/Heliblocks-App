import { useContext, useEffect, useState } from "react";
import { AuthContext } from "services/auth";
import { usersCollection } from "services/database";
import { getHeliblock } from "services/heliblocks";

const isPro = ({ stripeRole }) => stripeRole === "pro";
const MAX_PRIVATES_BLOCKS_FREE_ACOUNT = 1;

export const useCanSaveRestrictedHeliblocks = () => {
  const [loaded, setLoaded] = useState(false);
  const [canSaveRestricted, setCanSaveRestricted] = useState(false);
  const { isLoaded: authLoaded, user } = useContext(AuthContext);

  useEffect(() => {
    let cancel = false;

    if (!authLoaded) {
      return;
    }

    if (!user) {
      setLoaded(true);
      setCanSaveRestricted(false);
      return;
    }

    if (isPro(user)) {
      setLoaded(true);
      setCanSaveRestricted(true);
      return;
    }

    const unsubscribe = usersCollection.doc(user.uid).onSnapshot((snapshot) => {
      const { heliblocks } = snapshot.data();

      if (Array.isArray(heliblocks) && heliblocks.length > 0) {
        Promise.all(heliblocks.map(getHeliblock))
          .then((userHeliblocks) => {
            if (cancel) return;

            const heliblocksPrivate = userHeliblocks.filter(({ restricted }) =>
              Boolean(restricted)
            );
            setCanSaveRestricted(
              heliblocksPrivate.length < MAX_PRIVATES_BLOCKS_FREE_ACOUNT
            );
          })
          .catch(() => {
            if (cancel) return;
            setCanSaveRestricted(false);
          })
          .finally(() => {
            if (cancel) return;
            setLoaded(true);
          });
      } else {
        if (cancel) return;
        setLoaded(true);
        setCanSaveRestricted(true);
      }
    });

    return () => {
      cancel = true;
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [user, authLoaded]);

  return [loaded, canSaveRestricted];
};
