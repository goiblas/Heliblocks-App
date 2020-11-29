import React from "react";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from ".";

const SkeletonImage = ({ width, height, ...props }) => (
  <Box position="relative" pb={`calc(${height}/${width} * 100%)`} {...props}>
    <Box position="absolute" top="0" left="0" bottom="0" right="0">
      <Skeleton height="100%" width="100%" />
    </Box>
  </Box>
);

export const SkeletonCard = () => {
  return (
    <Box data-testid="skeleton-card">
      <SkeletonImage width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
      <Stack spacing={4} py={4}>
        <Skeleton h={3} />
        <Skeleton h={3} w="40%" />
      </Stack>
    </Box>
  );
};
