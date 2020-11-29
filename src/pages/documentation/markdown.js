import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import { Heading, Link, ListItem, Box } from "@chakra-ui/react";
import { Fill } from "react-slot-fill";

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
}

const Markdown = ({ content }) => {
  const RenderHeading = ({ heading }) => {
    const ref = useRef(null);
    const [actived, setActived] = useState(false);
    useLayoutEffect(() => {
      const inView = (target) =>
        target.getBoundingClientRect().top > -40 &&
        target.getBoundingClientRect().top < window.innerHeight / 2;

      const handleScroll = () => setActived(inView(ref.current));
      setActived(inView(ref.current));

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, [heading]);

    const id = string_to_slug(ReactDOMServer.renderToString(heading.children));
    return (
      <>
        <Heading ref={ref} as={"h" + heading.level} mb="6" pt="12" id={id}>
          {heading.children}
        </Heading>
        <Fill name="Docs.menu">
          <ListItem mb="2">
            <Link href={"#" + id} fontWeight={actived ? "bold" : "normal"}>
              {heading.children}
            </Link>
          </ListItem>
        </Fill>
      </>
    );
  };
  const renderList = (list) => (
    <Box as={list.ordered ? "ol" : "ul"} mb="6">
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

  return (
    <ReactMarkdown
      renderers={{
        heading: (heading) => <RenderHeading heading={heading} />,
        paragraph: renderParagraph,
        list: renderList,
        inlineCode: renderInlineCode,
        code: renderCode,
      }}
      source={content}
    />
  );
};

export default Markdown;
