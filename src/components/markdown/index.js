import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Heading, Box } from "@chakra-ui/core";

const Markdown = ({content}) => {
    const RenderHeading = (heading) => (
        <Heading as={"h" + heading.level} mb="6" pt="12">{heading.children}</Heading>
    )
    const renderList = (list) => (  
      <Box as={list.ordered ? "ol": "ul"} mb="6">{list.children}</Box>
      );
    const renderInlineCode = (code) => (
      <Box as="code" fontSize="small" backgroundColor="gray.50" p="1">{code.children}</Box>
    )
    const renderCode = (code) => ( 
      <Box as="pre" w="100%" overflowX="auto" fontSize="small" p="6" backgroundColor="gray.50" mb="8">{code.value}</Box>
    );
    const renderParagraph = (paragraph) => <Box as="p" mb="6">{paragraph.children}</Box>
  
    return <ReactMarkdown
                renderers={{
                    heading: RenderHeading,
                    paragraph: renderParagraph,
                    list: renderList,
                    inlineCode: renderInlineCode, 
                    code: renderCode
                    }}
                source={content} />
}

export default Markdown;