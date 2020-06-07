import React from "react";
import { Box, useTheme } from "@chakra-ui/core";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from ".";

const SkeletonImage = ({ width, height, ...props }) => (
  <Box position="relative" pb={`calc(${height}/${width} * 100%)`} {...props}>
    <Box position="absolute" top="0" left="0" bottom="0" right="0">
      <Skeleton height="100%" width="100%" />
    </Box>
  </Box>
);

export const SkeletonCard = () => {
  const { colors } = useTheme();
  return (
    <SkeletonTheme color={colors.gray[100]}>
      <Box data-testid="skeleton-card">
        <SkeletonImage width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
        <Box alignItems="flex-start" py="5">
          <Skeleton width="66%" />
        </Box>
      </Box>
    </SkeletonTheme>
  );
};
