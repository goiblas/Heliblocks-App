import { useState, useEffect } from "react";
import PreviewConfig from "./config";
const {
  themes,
  stylesheets_shared,
  classname,
  alignments
} = PreviewConfig;

const getAlignmentClassname = alignmentId => {
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

const useMockup = (initialContent, config) => {
  const [html, setHtml] = useState("");
  const [theme, setTheme] = useState(config.theme);
  const [content, setContent] = useState(initialContent);
  const [alignment, setAlignment] = useState(config.alignment);
  
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

  return {
    html,
    setHtml: setContent,
    theme,
    setTheme,
    alignment,
    setAlignment
  };
};

export default useMockup;
