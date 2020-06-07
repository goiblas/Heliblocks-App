const baseStyle = require("./baseStyles");

function getAligmentClass(alignment) {
  switch (alignment) {
    case "wide":
      return "alignwide";
    case "full":
      return "alignfull";
    default:
      return "";
  }
}

module.exports = function({ html, css, alignment }) {
  return `
     <style>${baseStyle}${css}</style>
      <div style="display: grid; min-height: 100%; align-items: center;">
        <div class="hb-block-container ${getAligmentClass(alignment)}">
          ${html}
        <div>
      <div>
  `;
};
