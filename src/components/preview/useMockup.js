import { useState, useEffect } from "react";

const CLASSNAME_CONTAINER = "hb-block-container";
const alignmentsDictionary = new Map([
  ["normal", ""],
  ["wide", "alignwide"],
  ["full", "alignfull"]
]);

const useMockup = ({ content, alignment, additionalLinks}) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(`
            <!DOCTYPE html>
            <style>
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
              font-size: 100%;
              line-height: 1.5;
            }
            
            .hb-block-container {
              width: 90%;
              max-width: 42rem;
              margin: 0 auto;
            }
            .alignwide {
              max-width: 58rem;
            }
            .alignfull {
              max-width: 100%;
              width: 100%;
            }
            </style>          
            ${additionalLinks}
            <div class="${CLASSNAME_CONTAINER} ${alignmentsDictionary.get(
      alignment
    )}">
                ${content}
            </div>
        `);
  }, [content, alignment, additionalLinks]);

  return [html];
};

export default useMockup;
