import React, { useEffect, useRef, useCallback } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import PropTypes from "prop-types";
import { Card } from "components/card";
import { CardsGrid } from "components/containers";

const InfinityResults = ({ hits, hasMore, refine }) => {
  const sentinel = useRef();

  const onSentinelIntersection = useCallback(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasMore) {
          refine();
        }
      });
    },
    [refine, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onSentinelIntersection);
    return () => observer.disconnect();
  }, [onSentinelIntersection]);

  return (
    <>
      <CardsGrid>
        {hits.map(({ title, description, screenshot, objectID, author }) => (
          <Card
            key={objectID}
            title={title}
            screenshot={screenshot}
            id={objectID}
            author={author}
          />
        ))}
      </CardsGrid>
      <div ref={sentinel} />
    </>
  );
};

InfinityResults.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired
};

export default connectInfiniteHits(InfinityResults);
