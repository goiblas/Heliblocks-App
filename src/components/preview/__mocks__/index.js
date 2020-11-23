import React from "react";
import useMockup from "../useMockup";

const Preview = ({ html, css, alignment, additionalLinks }) => {
  const content = `<style>${css}</style>${html}`;
  const [mockup] = useMockup({ content, alignment, additionalLinks });

  return <div title="Preview" dangerouslySetInnerHTML={{ __html: mockup }} />;
};

export default Preview;
