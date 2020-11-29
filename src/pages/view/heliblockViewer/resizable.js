import React, { useState, useRef, useEffect } from "react";
import { Container, Section, Bar } from "react-simple-resizer";
import { useTheme, Box } from "@chakra-ui/react";
import { ResizeIcon } from "theme/icons";

const Divider = (props) => {
  const theme = useTheme();
  return (
    <Bar
      size={8}
      style={{
        display: "flex",
        background: theme.colors.gray[100],
        borderLeft: `1px solid ${theme.colors.gray[200]}`,
      }}
      {...props}
    >
      <ResizeIcon color="gray.500" m="auto" />
    </Bar>
  );
};

const Resizable = (props) => {
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef) {
      const resizer = containerRef.current.getResizer();
      resizer.resizeSection(1, { toSize: 0 });
      containerRef.current.applyResizer(resizer);
    }
  }, [containerRef]);

  return (
    <Box as={Container} h="100%" ref={containerRef}>
      <Section
        minSize={320}
        style={{ pointerEvents: dragging ? "none" : "auto" }}
      >
        {props.children}
      </Section>
      <Divider onStatusChanged={setDragging} />
      <Box as={Section} bg="gray.600" borderRadius="0 4px 0 0" h="100%" />
    </Box>
  );
};

export default Resizable;
