# Mejoras implementadas en Techsells

> Este documento conserva la validación de la refactorización original de 40 pruebas. La revisión conjunta posterior con la API amplió la suite a 44 pruebas y corrigió diferencias de integración. Estado actual y pasos locales: [REVISION_CONJUNTA_API.md](docs/REVISION_CONJUNTA_API.md).

Actualizado el 12 de noviembre de 2026. Cambios locales sobre `master`, a partir de `8048bd0`. No se hizo commit, push ni despliegue.

La implementación del frontend está preparada para revisión. Se conservaron las rutas y los contratos con APIGeneral, junto con el diseño general. La validación automatizada y el recorrido público están completados; el login y los pagos reales de prueba requieren la preparación descrita al final.

## Cambios principales

| Área | Resultado |
| --- | --- |
| Instalación y herramientas | Lockfile reparado; dependencias actualizadas dentro de las líneas compatibles; Node alineado con los requisitos de jsdom y las herramientas de pruebas. |
| Calidad de código | ESLint reparado y sin advertencias; TypeScript también comprueba las pruebas; Prettier y finales de línea consistentes en Linux/Windows. |
| Servicios HTTP | Catálogo, usuarios y compras separados en `features/`; cliente, contratos y errores comunes en `shared/api`. `Services.ts` conserva reexportaciones compatibles. |
| Errores y formularios | Los servicios rechazan los fallos; los formularios conservan borradores y muestran éxito solo después de confirmación. Se manejan errores de red y 401/403/404/429. |
| Sesión | El token se configura antes del router. Cambiar de sesión limpia datos privados y descarta respuestas antiguas. Se retiran las claves locales heredadas `micarrito` y `misfavoritos`. |
| Carrito y favoritos | Mutaciones serializadas, cantidades válidas, lectura de los datos confirmados y conservación del estado cuando la API rechaza una operación. |
| Compras y checkout | Un checkout pendiente no vuelve a introducir una URL después de salir del carrito. Confirmar un pedido anterior no modifica el detalle de otro pedido abierto después. Se eliminaron recargas completas para actualizar estados de pedidos. |
| Catálogo | URL como referencia para filtros y paginación, navegación atrás/adelante sincronizada y descarte de resultados de búsquedas anteriores. Catálogo público y administrativo mantienen resultados independientes. |
| Productos | Tipos diferentes para detalle público y edición; adaptación de fotos/categorías sin modificar los payloads del backend. |
| Administración de productos | Formulario compartido para crear/editar, conservación de fotos/categorías tras guardar y validación de cargas. Enter en el diálogo de categorías no envía el producto por accidente. |
| Eliminación de productos | Confirmación explícita antes de llamar al endpoint existente; fallar conserva el diálogo y evita aparentar éxito. Las pruebas de esta escritura usan simulaciones. |
| Notificaciones | Contador derivado, marcado de lectura sincronizado y fin correcto del estado de carga cuando una mutación invalida una recarga. |
| Interfaz | Estados de carga/error/vacío diferenciados, diálogos con foco y Escape, labels, nombres accesibles y documento en español. |
| Imágenes | Logo local y componente de imagen con respaldo SVG local, evitando depender de una imagen externa cuando falla. |
| Carga del código | Pantallas cargadas por ruta y bibliotecas comunes separadas. El build no presenta la advertencia anterior de chunks mayores de 500 kB. |
| Documentación y CI | README ampliado, plantilla de entorno, contrato de API, comandos de calidad y workflow preparado para Node 24/26 en Windows/Linux. |

## Organización conservada y nueva

Los componentes y stores existentes siguen siendo reconocibles. La separación principal está en:

- `src/app/`: proveedores, router y comprobaciones de acceso de loaders.
- `src/features/catalogo/`, `compras/` y `usuario/`: llamadas por dominio.
- `src/shared/api/`: cliente HTTP, sesión, errores, notificaciones y normalización.
- `src/shared/ui/`: estados de solicitud, diálogo e imágenes de producto.
- `tests/`: pruebas de regresión aisladas.
- `scripts/smoke-browser.mjs`: recorrido público con Chrome, sin iniciar sesión ni escribir datos.

Se conservan React, Vite, Tailwind, Clerk, React Router, React Hook Form, Zustand y Axios. No se migró el framework ni se sustituyó el backend.

## Limpieza realizada

Se retiraron los componentes sin imports activos `Buscador`, `Iniciarsesionboton`, `Registrarboton` y `Productos_comprados`, junto con los helpers de servicios sin consumidores y bloques de prueba comentados.

Se retiraron `download.webp` y dos variantes de logo sin uso. Se conserva `images.webp` como favicon y el logo blanco que ahora usa el navbar. `Services.tsx` y `types.tsx` pasaron a `.ts` porque no contienen JSX.

Los controles administrativos de guardar roles/borrar usuarios no se conectaron a endpoints inexistentes: sus acciones pendientes están deshabilitadas. Eliminar productos sí tiene un endpoint confirmado y exige confirmación de interfaz.

## Verificación realizada

Entorno local: Windows, Node `26.11.1`, npm `11.20.0`.

| Comprobación | Resultado |
| --- | --- |
| `npm ci --ignore-scripts` desde instalación limpia | Correcto |
| `npm run format:check` | Correcto |
| `npm run lint` | Correcto, cero advertencias |
| `npm run typecheck:tests` | Correcto |
| `npm test` | **40 pruebas aprobadas en 9 archivos** |
| `npm run build` | Correcto, sin advertencias de tamaño de chunks |
| `npm audit` | **0 vulnerabilidades reportadas**, salida 0 |
| Sincronía de dependencias y engines entre manifiesto y lockfile | Correcta |
| `git diff --check` | Correcto |

Las regresiones cubren filtros, formatos de API, errores de guardado, permisos de loaders, aislamiento de sesión, respuestas tardías, cantidades, clics repetidos, recargas concurrentes, edición, direcciones, confirmación de eliminación e imágenes de respaldo. Son pruebas con respuestas simuladas; no crean cuentas ni cobros.

### Tamaños observados del build

Entrada principal: aproximadamente **348,39 kB** — **110,84 kB gzip**. Bibliotecas separadas: React/router **94,02 kB** y Clerk **148,39 kB**. Las pantallas adicionales se cargan por ruta.

Estos tamaños corresponden a archivos separados. No representan una reducción equivalente de toda la descarga inicial: las bibliotecas necesarias se siguen descargando. El objetivo es separar pantallas y mejorar la reutilización de archivos en caché.

### Recorrido público de navegador

El smoke usa un perfil temporal de Chrome y la API local con datos ficticios. Ayer se comprobó el servidor de desarrollo; hoy se comprueba el build con `vite preview`. Las capturas quedan en `test-results/`, ignorado por Git.

El recorrido del build de producción terminó correctamente:

| Paso | Evidencia |
| --- | --- |
| Catálogo | Renderizado en Chrome, sin estado de error |
| Búsqueda sin coincidencias | Mensaje de lista vacía correcto; respuesta HTTP 200 heredada interpretada |
| Volver atrás | URL, filtros y resultados restaurados |
| Detalle y comentarios | Endpoints locales con HTTP 200 y producto renderizado |
| Escritorio y móvil | Capturas revisadas en 1.365 y 390 píxeles de ancho |
| Excepciones de JavaScript | Ninguna durante el recorrido |

Los cambios también se compararon con los valores de configuración del `.env`, sin encontrar coincidencias de sus claves publicables u otros valores en los archivos nuevos/modificados. La URL pública de ejemplo de la API se excluyó de esa comparación. `.env.gpg` no tiene cambios y el `.env` se conserva ignorado por Git.

## Coordinación con APIGeneral

Se leyeron el informe histórico y los documentos actuales `API/ACTUALIZACION_LOCAL.md`, `API/VERIFICACION_LOCAL.md` y `API/README.md`. También se contrastaron rutas, respuestas, validaciones y vistas SQL. No se modificaron sus archivos, procesos, bases de datos ni configuración.

Se conservaron `/sena`, `Categorias[]`, las respuestas exitosas heredadas, el catálogo vacío con su mensaje concreto y checkout como string JSON HTTPS. Véase [el contrato de integración](docs/CONTRATO_APIGENERAL.md).

## Lo que requiere validación conjunta antes de publicar

1. **Login real y cuentas de prueba.** Los IDs del seed de APIGeneral son ficticios y no sirven como tokens. Hace falta una cuenta de la misma instancia de Clerk y su sincronización correcta. El backend documenta que falta el secreto de firma del webhook en el entorno proporcionado.
2. **Comprador y administrador reales.** Verificar acceso por rol, propiedad de pedidos, cambio de sesión y revocación de permisos contra el servidor, con dos compradores y un administrador de prueba.
3. **Stripe test y callbacks.** Probar compra individual, carrito completo, cancelación y confirmación con el backend preparado. No se abrió un túnel ni se crearon pagos en esta implementación.
4. **Pantallas autenticadas de Clerk.** Comparar login, registro y perfil antes de una migración mayor del SDK. Se conservó Clerk React 5 actualizado y estilos internos heredados para limitar cambios visuales. Clerk 5 y ESLint 9 emiten avisos de fin de soporte; sus migraciones mayores quedan separadas de esta entrega.
5. **Proveedor de imágenes.** Revisar restricciones del preset unsigned en Cloudinary. La validación del navegador no sustituye esas restricciones externas.
6. **Publicación.** El workflow está preparado, pero no se ha ejecutado en GitHub ni se ha probado un despliegue de Vercel. No se hizo push ni se aplicaron migraciones del backend.

`npm audit` sin avisos y una suite aprobada no son una garantía de ausencia de fallos. Los resultados anteriores delimitan lo comprobado y permiten revisar o integrar los cambios sin confundir pruebas simuladas con recorridos reales.
