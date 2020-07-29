import React, { useEffect, useState} from "react";
import { getHeliblock } from "services/heliblocks";
import { getUser } from "services/users";

export const withHeliblock = Component => ({ id, fallback }) => {
    const [heliblock, setHeliblock] = useState(null);
    useEffect(() => {
      const loadHeliblock = async (id) => {
        const responseHeliblock = await getHeliblock(id);
        const author = await getUser(responseHeliblock.author);
        return {
          ...responseHeliblock,
          author
        }
      } 
  
      loadHeliblock(id)
        .then(setHeliblock)
        .catch(() => {
          setHeliblock({ notFound: true });
        });
  
    }, [id]);
  
    if (!heliblock) {
      return fallback;
    }
    if (heliblock.notFound) {
      return null;
    }
  
    return <Component id={id} {...heliblock} />;
  };