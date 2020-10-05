export default `
# Welcome to Heliblocks
Heliblocks was born with the need to reuse and share HTML and CSS fragments. For this, it makes use of the editing capabilities; the WordPress block editor and the customization possibilities of the native CSS variables.

In order to start using your heliblocks or those that are already created by the community, you must have the official block installed, from which you can search, insert and customize directly in your WordPress editor.

Heliblocks will allow you to insert custom HTML code into your WordPress pages, without the complexity of creating your own block but enjoying all the editing advantages of the WordPress block editor.

## Getting Started
Heliblocks tries to stay as close to the standards as possible, so you don't need to learn any specific language, it's just HTML and CSS.

You can use all the tags you want to build the HTML of your Heliblock, although for security reasons, for now the use of any type of script is not allowed.

All the CSS is encapsulated, so don't worry too much about the names you use, all the classes will be transformed to avoid collisions or clashes with the rest of the elements of the page where it is inserted.

## Customization
Heliblocks not only allows you to edit the content and images from the WordPress editor,but you can also allow other details such as colors, fonts, sizes, etc. to be customized.
For this you have to use CSS variables that starts with a default name and are defined within \`:root\`, for example: 

~~~ css
:root {
	--hb-color-button-background: #00a2f9;
}
~~~

This will display a color picker labeled "Button background" in the WordPress editor inspector, that will allow the user to edit that color.

### Available formats

** --hb-color-***

Define colors, for example: \`-—hb-color-box-background: #ffffff;\`

** --hb-text-***

Define string text, for example: \`-—hb-text-body-family: -apple-system, system-ui, sans-serif;\`

** --hb-size-***

Define sizes in pixels, for example: \` -—hb-size-title-size: 45px; \`

** --hb-value-***

Define unitless values, for example:: \`-—hb-value-title-line-height: 1.2;\`

### Define min max values

By default the variables with the format  \`-—hb-size\` and \`—-hb-value\` have a minimum value of 0 and a maximum of 100, if you want to customize those values, you have to add the values after the format separated by hyphens, for example:

~~~ css
-—hb-size-16-60-title-size: 45px;
-—hb-value-1-3-title-line-height: 1.2;
~~~
`;
