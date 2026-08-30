# Catálogos — generador

Los tres catálogos PDF que sirve Strapi (`main_catalogue` y las dos fichas de
`catalogues`) se generan desde aquí. Los PDF originales del proveedor son
listados tabulares sin diseño; esto los vuelve a componer con la tipografía y
el color de la web (`lib/theme.ts`), sin tocar ni un dato.

```
tools/catalogues/
├── src/                 parsers, generador y control de calidad
├── data/                los listados extraídos de los PDF de origen (JSON)
├── fonts/               subconjunto latino de Newsreader y Manrope (woff2)
└── out/                 salida (no versionada)
```

## Cadena completa

Los tres PDF de origen viven fuera del repo (los envía el proveedor). Con las
rutas a esos ficheros:

```bash
cd tools/catalogues

# 1. Extraer los listados. Cada parser verifica lo que extrae contra el PDF.
node src/parse-main.mjs     "…/GIRONA PLANTS - 2025-2026.pdf"                    data/main.json
node src/parse-vivaces.mjs  "…/DISPONIBLE VIVACES GRAMÍNEAS Y HELECHOS ….pdf"    data/vivaces.json
node src/clean-vivaces.mjs  data/vivaces.json data/vivaces.clean.json
node src/parse.mjs          "…main…" "…esquejes…" "…vivaces…" data   # esquejes.json

# 2. Componer el HTML de imprenta y las portadas
node src/gen.mjs

# 3. Rasterizar. WKWebView, porque Chrome headless no arranca en este equipo.
swiftc -O -o src/webrender src/webrender.swift
src/webrender pdf out/main.html       out/main.pdf       794 1123
src/webrender pdf out/cuttings.html   out/cuttings.pdf   794 1123
src/webrender pdf out/perennials.html out/perennials.pdf 794 1123
src/webrender png out/cover-main.html      out/cover-main.png      1200 1600
src/webrender png out/card-cuttings.html   out/card-cuttings.png   1040 560
src/webrender png out/card-perennials.html out/card-perennials.png 1040 560

# 4. Comprobar que no se ha perdido ninguna fila por el camino
node src/qa.mjs
```

`src/verify.mjs` hace la comprobación equivalente sobre el parser del catálogo
general: cuenta y suma los precios del PDF de origen contra `data/main.json`.

`qa.mjs` vuelve a leer los PDF generados y compara fila por fila con los JSON:
lo único que no encuentra son los nombres largos que parten en dos líneas.

## Publicar en Strapi

`cms/app/scripts/upload-catalogues.js`, ejecutado dentro del contenedor. Ver la
cabecera de ese fichero.

## Decisiones que conviene recordar

- **A4 a 96 dpi (794×1123 px)**, dos columnas. El listado general baja de 30 a
  20 páginas, esquejes de 34 a 23 y vivaces de 21 a 15.
- **La paginación la decide el navegador** (`src/paginate.js`): mide cada bloque
  una sola vez con el ancho real de columna y reparte por aritmética. Medir
  bloque a bloque fuerza miles de *reflows* y tumba el renderizador.
- **Las portadas se maquetan en `rem` sobre su propio ancho**, así la misma
  composición sirve para la página A4, la portada 3:4 de la web y la ficha
  apaisada de 1040×560.
- **El CSS de portada se acota a `.cover-page`** antes de entrar en el
  documento: comparte nombres de clase con el interior (`.sub`, `.body`,
  `.title`) y sin acotar deshacía las filas de continuación de la tabla.
- **Los helechos salen dos veces en el PDF de vivaces** (semanas 14-30 y 14-29,
  75 y 76 filas). `clean-vivaces.mjs` se queda con el segundo bloque, que es el
  posterior y el más completo. Si el proveedor lo corrige, revisar eso.
- La columna sin cabecera del listado de vivaces (100 / 84 / 60 / 28) se publica
  como «unidades»; el origen no la titula.
