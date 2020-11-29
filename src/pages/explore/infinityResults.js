import React, { useEffect, useRef, useCallback } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import PropTypes from "prop-types";
import { Card } from "components/card";
import { CardsGrid } from "components/containers";
import { Box } from "@chakra-ui/react";

const InfinityResults = ({ hits, hasMore, refine }) => {
  const sentinel = useRef();

  const onSentinelIntersection = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore) {
          refine();
        }
      });
    },
    [refine, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onSentinelIntersection);
    observer.observe(sentinel.current);

    return () => observer.disconnect();
  }, [onSentinelIntersection, sentinel]);

  return (
    <Box mb="8%">
      <CardsGrid>
        {hits.map(({ title, screenshot, objectID, author }) => (
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
    </Box>
  );
};

InfinityResults.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfinityResults);
