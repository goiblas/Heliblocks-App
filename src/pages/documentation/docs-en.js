export default `
# Welcome to Heliblocks
Heliblocks nace con la necesidad de reutilizar y compartir fragmentos de HTML y CSS. Para ello hace uso de las capacidades de edición, del editor de bloques de WordPress y las posibilidades de personalización, de las variables nativas de CSS.

Para poder empezar a utilizar tus heliblocks o los ya creados por la comunidad, deberas tener instalado el bloque oficial, desde el cual podrás buscar, insertar y personalizar directamente en tu editor de WordPress.

Heliblocks te permitirá insertar código HTML personalizado en tus páginas en WordPress, sin la complejidad de crear un bloque propio pero disfrutando de todas las ventajas de edición del editor de bloques de WordPress.

## Getting Started
Heliblocks intenta mantenerse lo más cerca de los estándares, con lo que no es necesario que aprendas ningún lenguaje especifico, es simplemente, HTML y CSS. 

Puedes utilizar todas las etiquetas que quieras para construir el HTML de tu Heliblock, aunque por  seguridad, por ahora no está permitido utilizar ningún tipo de script. 

Todo el CSS es encapsulado, así que no te preocupes demasiado por los nombre que utilizas, todas las clases serán transformadas para evitar colisiones con el resto de elementos de la página donde se inserte.

## Customization
Heliblocks no solo permite editar el contenido y las imágenes desde el editor de WordPress, también puedes permitir que se personalizen otros detalles como colores, fuentes, tamaños, etc.
Para ello tienes que utilizar variables de CSS que comiencen por unos nombre predeterminados y que estén definidas dentro de \`:root\`, por ejemplo: 

~~~ css
:root {
	--hb-color-button-background: #00a2f9;
}
~~~

Esto mostrará en el inspector del editor de WordPress un selector de color con la etiqueta "Button background" que permitirá al usuario editar ese color.


### Available formats

** --hb-color-***

Se utiliza para definir colores, ejemplo: \`-—hb-color-box-background: #ffffff;\`

** --hb-text-***

Se utiliza para definir cadena de texto
ejemplo: \`-—hb-text-body-family: -apple-system, system-ui, sans-serif;\`

** --hb-size-***

Se utiliza para definir tamaños en píxeles, ejemplo: \` -—hb-size-title-size: 45px; \`

** --hb-value-***

Se utiliza para definir valores sin unidad, ejemplo: \`-—hb-value-title-line-height: 1.2;\`

### Define min max values

Por defecto las variables con el formato \`-—hb-size\` y \`—-hb-value\` tienen un valor mínimo de 0 y un máximo de 100, si quieres personalizar esos valores tienes que añadir los valores después del formato separados por guiones, ejemplo: 

~~~ css
-—hb-size-16-60-title-size: 45px;
-—hb-value-1-3-title-line-height: 1.2;
~~~
`;