import React, { useState, useEffect } from "react";
import { getHeliblock } from "services/heliblocks";
import { CardOwner, Card, SkeletonCard } from "components/card";

const withHeliblock = Component => ({ id, fallback, author, ...props }) => {
  const [heliblock, setHeliblock] = useState(null);
  useEffect(() => {
    getHeliblock(id)
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
  if (author) {
    heliblock.author = author;
  }
  return <Component id={id} {...heliblock} {...props} />;
};

const CardOwnerWithHeliblock = withHeliblock(CardOwner);
const CardWithHeliblock = withHeliblock(Card);

const CardProfile = ({ id, isOwner, author }) => {
  if (isOwner) {
    return <CardOwnerWithHeliblock id={id} fallback={<SkeletonCard />} />;
  } else {
    return (
      <CardWithHeliblock author={author} id={id} fallback={<SkeletonCard />} />
    );
  }
};

export default CardProfile;
