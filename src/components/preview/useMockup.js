import { useState, useEffect } from "react";

const CLASSNAME_CONTAINER = "hb-block-container";
const alignmentsDictionary = new Map([
  ["normal", ""],
  ["wide", "alignwide"],
  ["full", "alignfull"]
]);
const stylesheets = ["/preview/variables.css", "/preview/base.css"];

const useMockup = ({ content, alignment }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(`
            <!DOCTYPE html>
            ${stylesheets
              .map(stylesheet => `<link rel="stylesheet" href="${stylesheet}">`)
              .join("")}
            <div class="${CLASSNAME_CONTAINER} ${alignmentsDictionary.get(
      alignment
    )}">
                ${content}
            </div>
        `);
  }, [content, alignment]);

  return [html];
};

export default useMockup;
