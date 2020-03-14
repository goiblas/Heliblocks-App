import { useState, useEffect } from "react";
import {
  themes,
  stylesheets_shared,
  classname,
  alignments
} from "./config";

function getAlignmentClassname(alignmentId) {
  const { clasname } =  alignments.filter( alignment =>  alignment.id === alignmentId)[0];
  return clasname
};

function getStylesheetTheme(themeId) {
  const { stylesheet } = themes.filter(theme => theme.id === themeId)[0];
  if (!stylesheet) {
    return "";
  }
  return `<link rel="stylesheet" href="${stylesheet}">`;
}

const useMockup = ({content, theme, alignment}) => {
  const [html, setHtml] = useState("");
  
  useEffect(() => {
    setHtml(`
            <!DOCTYPE html>
            ${stylesheets_shared
              .map(stylesheet => `<link rel="stylesheet" href="${stylesheet}">`)
              .join("")}
            ${getStylesheetTheme(theme)}
            <div class="preview-wrapper">
                <div class="preview-entry-content">
                  <div class="${classname} ${getAlignmentClassname( alignment)}">
                      ${content}
                  </div>
                </div>
            </div>
        `);
  }, [theme, content, alignment]);

  return [html];
};

export default useMockup;
