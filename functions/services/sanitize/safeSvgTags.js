// https://github.com/magic/tags/blob/master/src/index.mjs
module.exports = [
  // The <a> SVG element creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.
  "a",
  // This element implements the SVGAnimateElement interface.
  "animate",
  // The <animateMotion> element causes a referenced element to move along a motion path.
  "animateMotion",
  // The animateTransform element animates a transformation attribute on a target element, thereby allowing animations to control translation, scaling, rotation and/or skewing.
  "animateTransform",
  // The <circle> SVG element is an SVG basic shape, used to create circles based on a center point and a radius.
  "circle",
  // The <clipPath> SVG element defines a clipping path. A clipping path is used/referenced using the clip-path property.
  "clipPath",
  // The <color-profile> element allows describing the color profile used for the image.
  // DOES NOT CONFORM TO HTML ELEMENT NAMES. DISABLED
  // 'color-profile',
  // The <defs> element is used to store graphical objects that will be used at a later time. Objects created inside a <defs> element are not rendered directly. To display them you have to reference them (with a <use> element for example).
  "defs",
  // Each container element or graphics element in an SVG drawing can supply a description string using the <desc> element where the description is text-only.
  "desc",
  // The <discard> SVG element allows authors to specify the time at which particular elements are to be discarded, thereby reducing the resources required by an SVG user agent. This is particularly useful to help SVG viewers conserve memory while displaying long-running documents.
  "discard",
  // The <ellipse> element is an SVG basic shape, used to create ellipses based on a center coordinate, and both their x and y radius.
  "ellipse",
  // The <feBlend> SVG filter primitive composes two objects together ruled by a certain blending mode. This is similar to what is known from image editing software when blending two layers. The mode is defined by the mode attribute.
  "feBlend",
  // The <feColorMatrix> SVG filter element changes colors based on a transformation matrix. Every pixel's color value (represented by an [R,G,B,A] vector) is matrix multiplied to create a new color:
  "feColorMatrix",
  // Th <feComponentTransfer> SVG filter primitive performs color-component-wise remapping of data for each pixel. It allows operations like brightness adjustment, contrast adjustment, color balance or thresholding.
  "feComponentTransfer",
  // The <feComposite> SVG filter primitive performs the combination of two input images pixel-wise in image space using one of the Porter-Duff compositing operations: over, in, atop, out, xor, and lighter. Additionally, a component-wise arithmetic operation (with the result clamped between [0..1]) can be applied.
  "feComposite",
  // The <feConvolveMatrix> SVG filter primitive applies a matrix convolution filter effect. A convolution combines pixels in the input image with neighboring pixels to produce a resulting image. A wide variety of imaging operations can be achieved through convolutions, including blurring, edge detection, sharpening, embossing and beveling.
  "feConvolveMatrix",
  // The <feDiffuseLighting> SVG filter primitive lights an image using the alpha channel as a bump map. The resulting image, which is an RGBA opaque image, depends on the light color, light position and surface geometry of the input bump map.
  "feDiffuseLighting",
  // The <feDisplacementMap> SVG filter primitive uses the pixel values from the image from in2 to spatially displace the image from in.
  "feDisplacementMap",
  // The <feDistantLight> filter primitive defines a distant light source that can be used within a lighting filter primitive: <feDiffuseLighting> or <feSpecularLighting>.
  "feDistantLight",
  // The <feDropShadow> filter primitive creates a drop shadow of the input image. It is a shorthand filter, and is defined in terms of combinations of other filter primitives.
  "feDropShadow",
  // The <feFlood> SVG filter primitive fills the filter subregion with the color and opacity defined by flood-color and flood-opacity.
  "feFlood",
  // The <feFuncA> SVG filter primitive defines the transfer function for the alpha component of the input graphic of its parent <feComponentTransfer> element.
  "feFuncA",
  // The <feFuncB> SVG filter primitive defines the transfer function for the blue component of the input graphic of its parent <feComponentTransfer> element.
  "feFuncB",
  // The <feFuncG> SVG filter primitive defines the transfer function for the green component of the input graphic of its parent <feComponentTransfer> element.
  "feFuncG",
  // The <feFuncR> SVG filter primitive defines the transfer function for the red component of the input graphic of its parent <feComponentTransfer> element.
  "feFuncR",
  // The <feGaussianBlur> SVG filter primitive blurs the input image by the amount specified in stdDeviation, which defines the bell-curve.
  "feGaussianBlur",
  // The <feImage> SVG filter primitive fetches image data from an external source and provides the pixel data as output (meaning if the external source is an SVG image, it is rasterized.)
  "feImage",
  // The <feMerge> SVG element allows filter effects to be applied concurrently instead of sequentially. This is achieved by other filters storing their output via the result attribute and then accessing it in a <feMergeNode> child.
  "feMerge",
  // The feMergeNode takes the result of another filter to be processed by its parent <feMerge>.
  "feMergeNode",
  // The <feMorphology> SVG filter primitive is used to erode or dilate the input image. It's usefulness lies especially in fattening or thinning effects.
  "feMorphology",
  // The <feOffset> SVG filter primitive allows to offset the input image. The input image as a whole is offset by the values specified in the dx and dy attributes.
  "feOffset",
  // The <fePointLight> filter primitive defines a light source which allows to create a point light effect. It that can be used within a lighting filter primitive: <feDiffuseLighting> or <feSpecularLighting>.
  "fePointLight",
  // The <feSpecularLighting> SVG filter primitive lights a source graphic using the alpha channel as a bump map. The resulting image is an RGBA image based on the light color. The lighting calculation follows the standard specular component of the Phong lighting model. The resulting image depends on the light color, light position and surface geometry of the input bump map. The result of the lighting calculation is added. The filter primitive assumes that the viewer is at infinity in the z direction.
  "feSpecularLighting",
  // The <feSpotLight> SVG filter primitive defines a light source which allows to create a spotlight effect. It that can be used within a lighting filter primitive: <feDiffuseLighting> or <feSpecularLighting>.
  "feSpotLight",
  // The <feTile> SVG filter primitive allows to fill a target rectangle with a repeated, tiled pattern of an input image. The effect is similar to the one of a <pattern>.
  "feTile",
  // The <feTurbulence> SVG filter primitive creates an image using the Perlin turbulence function. It allows the synthesis of artificial textures like clouds or marble. The resulting image will fill the entire filter primitive subregion.
  "feTurbulence",
  // The <filter> SVG element serves as container for atomic filter operations. It is never rendered directly. A filter is referenced by using the filter attribute on the target SVG element or via the filter CSS property.
  "filter",
  // The <foreignObject> SVG element allows for inclusion of a different XML namespace. In the context of a browser it is most likely XHTML/HTML.
  "foreignObject",
  // The <g> SVG element is a container used to group other SVG elements.
  "g",
  // The <hatch> SVG element is used to fill or stroke an object using one or more pre-defined paths that are repeated at fixed intervals in a specified direction to cover the areas to be painted.
  "hatch",
  // The <hatchpath> SVG element defines a hatch path used by the <hatch> element.
  "hatchpath",
  // The <image> SVG element includes images inside SVG documents. It can display raster image files or other SVG files.
  "image",
  // The <line> element is an SVG basic shape used to create a line connecting two points.
  "line",
  // The <linearGradient> element lets authors define linear gradients that can be applied to fill or stroke of graphical elements.
  "linearGradient",
  // The <marker> element defines the graphic&nbsp;that is to be used for drawing arrowheads or polymarkers on a given <path>, <line>, <polyline> or <polygon> element.
  "marker",
  // The <mask> element defines an alpha mask for compositing the current object into the background. A mask is used/referenced using the mask property.
  "mask",
  "mesh",
  "meshgradient",
  "meshpatch",
  "meshrow",
  // The <metadata> SVG element allows to add metadata to SVG content.
  // Metadata is structured information about data.
  // The contents of <metadata> elements should be elements from other XML namespaces such as RDF, FOAF, etc.
  "metadata",
  // The <mpath> sub-element for the <animateMotion> element provides the ability to reference an external <path> element as the definition of a motion path.
  "mpath",
  // The <path> SVG element is the generic element to define a shape. All the basic shapes can be created with a path element.
  "path",
  // The <pattern> element defines a graphics object which can be redrawn at repeated x and y-coordinate intervals (&quot;tiled&quot;) to cover an area.
  "pattern",
  // The <polygon> element defines a closed shape consisting of a set of connected straight line segments. The last point is connected to the first point. For open shapes see the&nbsp;<polyline> element.
  "polygon",
  // The <polyline> SVG element is an SVG basic shape that creates straight lines connecting several points. Typically a polyline is used to create open shapes as the last point doesn't have to be connected to the first point. For closed shapes see the <polygon> element.
  "polyline",
  // The <radialGradient> SVG element lets authors define radial gradients to fill or stroke graphical elements.
  "radialGradient",
  // The <rect> element is a basic SVG shape that creates rectangles, defined by their corner's position, their width, and their height. The rectangles may have their corners rounded.
  "rect",
  // The <set> element provides a simple means of just setting the value of an attribute for a specified duration. It supports all attribute types, including those that cannot reasonably be interpolated, such as string and boolean values. The <set> element is non-additive. The additive and accumulate attributes are not allowed, and will be ignored if specified.
  "set",
  // The <solidcolor> SVG element lets authors define a single color for use in multiple places in an SVG document. It is also useful as away of animating a palette colors.
  "solidcolor",
  // The <stop> SVG element defines the ramp of colors to use on a gradient, which is a child element to either the <linearGradient> or the <radialGradient> element.
  "stop",
  // The svg element is a container that defines a new coordinate system and viewport. It is used as the outermost element of any SVG document but it can also be used to embed a SVG fragment inside any SVG or HTML document.
  "svg",
  // The <switch> SVG element evaluates the requiredFeatures, requiredExtensions and systemLanguage attributes on its direct child elements in order, and then processes and renders the first child for which these attributes evaluate to true. All others will be bypassed and therefore not rendered. If the child element is a container element such as a <g>, then the entire subtree is either processed/rendered or bypassed/not rendered.
  // Object.switch breaks javascript
  // 'switch',
  // The <symbol> element is used to define graphical template objects which can be instantiated by a <use> element.
  "symbol",
  // The SVG <text> element defines a graphics element consisting of text. It's possible to apply a gradient, pattern, clipping path, mask, or filter to <text>, just like any other SVG graphics element.
  "text",
  // In addition to text drawn in a straight line, SVG also includes the ability to place text along the shape of a <path> element. To specify that a block of text is to be rendered along the shape of a <path>, include the given text within a <textPath> element which includes an href attribute with a reference to a <path> element.
  "textPath",
  // Each container element or graphics element in an SVG drawing can supply a <title> element containing a description string where the description is text-only. When the current SVG document fragment is rendered as SVG on visual media, <title> element is not rendered as part of the graphics. However, some user agents may, for example, display the <title> element as a tooltip. Alternate presentations are possible, both visual and aural, which display the <title> element but do not display path elements or other graphics elements. The <title> element generally improves accessibility of SVG documents.
  "title",
  // Within a <text> element, text and font properties and the current text position can be adjusted with absolute or relative coordinate values by including a <tspan> element.
  "tspan",
  "unknown",
  // The <use> element takes nodes from within the SVG document, and duplicates them somewhere else.
  "use",
  // A view is a defined way to view the image, like a zoom level or a detail view.
  "view"
];
