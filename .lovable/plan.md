## Problem

El feed de Substack devuelve texto con entidades HTML numéricas (`&#237;`, `&#243;`, `&#8217;`, etc.) además de UTF-8. Nuestro parser en `src/lib/substack.ts` solo decodifica un puñado de entidades nombradas (`&amp;`, `&quot;`, `&#39;`, `&lt;`, `&gt;`, `&nbsp;`) y **no decodifica entidades numéricas** ni se aplica a los títulos. Como React escapa el texto al renderizarlo, el usuario ve literalmente `transici&#243;n` en lugar de `transición`.

La duplicación aparente ("transición&#243;n energética&#233;tica") viene de que el título ya está en UTF-8 correcto pero el `excerpt` (derivado de `description`/`content:encoded`) usa entidades, y ambos terminan concatenados o mostrados cerca.

## Plan

Endurecer la decodificación de entidades en `src/lib/substack.ts` para que todo el contenido del feed quede en UTF-8 limpio antes de llegar a la UI.

### Cambios

1. **`src/lib/substack.ts`**
   - Añadir un helper `decodeEntities(str)` que decodifique:
     - Entidades numéricas decimales: `&#NNN;` → `String.fromCodePoint(NNN)`
     - Entidades numéricas hexadecimales: `&#xHH;` → `String.fromCodePoint(0xHH)`
     - Entidades nombradas comunes: `&amp; &lt; &gt; &quot; &apos; &nbsp; &hellip; &mdash; &ndash; &laquo; &raquo; &iquest; &iexcl;` y las acentuadas (`&aacute;`, `&eacute;`, `&iacute;`, `&oacute;`, `&uacute;`, `&ntilde;` y mayúsculas, `&uuml;`).
   - Aplicar `decodeEntities` dentro de `pickTag` (para que títulos, links, fechas, creator queden ya decodificados) y dentro de `stripHtml` después de quitar tags.
   - Quitar las reglas ad-hoc de `stripHtml` (`&nbsp;`, `&amp;`, etc.) ya cubiertas por `decodeEntities`.
   - Asegurarse de que `firstImage` recibe el HTML decodificado antes de extraer el `src` (para URLs con `&amp;`).

2. **Verificación**
   - Confirmar que `<meta charset="utf-8">` está en `index.html` (ya lo está en Vite por defecto, sin cambios necesarios).
   - Recargar el preview y comprobar que los posts del Substack muestran "transición", "energética", "México", "más", etc., sin entidades visibles, en Home y Research.

### Archivos tocados

- `src/lib/substack.ts` (única edición)

No hay cambios de UI ni de copy. El fix es puramente en la capa de parseo del feed.
