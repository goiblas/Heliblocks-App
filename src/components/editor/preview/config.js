const config = {
    classname: "hb-block-container",
    themes: [
      {
        id: "twentytwenty",
        name: "Twenty Twenty",
        stylesheet: "/themes/twentytwenty/style.css"
      },
      {
        name: "Twenty Nineteen",
        id: "twentynineteen",
        stylesheet: "/themes/twentynineteen/style.css"
      },
      {
        id: "genesis",
        name: "Genesis",
        stylesheet: "/themes/genesis/style.css"
      },
      {
        id: "none",
        name: "None",
        stylesheet: ""
      }
    ],
    alignments: [
      {
        id: "normal",
        name: "Normal",
        clasname: ""
      },
      {
        id: "wide",
        name: "Wide",
        clasname: "alignwide"
      },
      {
        id: "full",
        name: "Full",
        clasname: "alignfull"
      }
    ],
    stylesheets_shared: ["/themes/variables.css", "/themes/shared.css"]
  }

export default config;