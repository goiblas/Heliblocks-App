import React from "react";
import ReactMarkdown from "react-markdown";
import { Heading, Box, Link } from "@chakra-ui/react";

const Markdown = ({ content }) => {
  const RenderHeading = (heading) => (
    <Heading
      as={"h" + heading.level}
      size={heading.level === 1 ? "xl" : "lg"}
      mb="6"
      pt={heading.level === 1 ? 16 : 6}
    >
      {heading.children}
    </Heading>
  );
  const renderList = (list) => (
    <Box as={list.ordered ? "ol" : "ul"} mb="6" ml="6" pt="2">
      {list.children}
    </Box>
  );
  const renderInlineCode = (code) => (
    <Box as="code" fontSize="small" backgroundColor="gray.50" p="1">
      {code.children}
    </Box>
  );
  const renderCode = (code) => (
    <Box
      as="pre"
      w="100%"
      overflowX="auto"
      fontSize="small"
      p="6"
      backgroundColor="gray.50"
      mb="8"
    >
      {code.value}
    </Box>
  );
  const renderParagraph = (paragraph) => (
    <Box as="p" mb="6">
      {paragraph.children}
    </Box>
  );
  const renderLink = (props) => <Link fontWeight="600" {...props} />;

  return (
    <ReactMarkdown
      renderers={{
        heading: RenderHeading,
        paragraph: renderParagraph,
        list: renderList,
        inlineCode: renderInlineCode,
        code: renderCode,
        link: renderLink,
      }}
      source={content}
    />
  );
};

export default Markdown;
