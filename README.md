# Techsells

Demo funcional de portafolio. Conserva registro, roles, compras Stripe test, pedidos, envío y recepción. Estado de la publicación: [ESTADO_PUBLICACION.md](docs/ESTADO_PUBLICACION.md).

Tienda del proyecto SENA construida con React, TypeScript y Vite. Incluye catálogo con filtros, detalle de productos, favoritos, carrito, comentarios, direcciones, historial de compras, notificaciones y administración. Clerk gestiona la identidad y APIGeneral integra PostgreSQL y Stripe.

## Preparación

Usa Node **26.13.1 LTS** y npm **11.21.2**, fijados en `.nvmrc` y `packageManager`. CI comprueba esa versión en Linux y Windows. Todas las dependencias directas están fijadas y `npm ci` reproduce el lockfile. Consulta [las versiones y excepciones de compatibilidad](docs/DEPENDENCIAS.md).

```powershell
npm ci
Copy-Item .env.example .env
```

Si ya tienes `.env`, conserva su contenido. Configura los valores de tu entorno:

| Variable | Uso |
| --- | --- |
| `VITE_AXIOS_BASE_URL` | Base de APIGeneral, incluyendo `/sena`; ejemplo local `http://localhost:3000/sena` |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clave publicable de la instancia de Clerk correspondiente a la API |
| `VITE_CLOUDINARY_CLOUD_NAME` | Opcional; nombre público de cuenta de imágenes |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Opcional; preset público de carga con restricciones configuradas en Cloudinary |

Si se omiten las variables opcionales de imágenes se conserva la configuración previa. El arranque muestra los nombres de configuración obligatoria ausente sin imprimir sus valores. Reinicia Vite después de cambiar el entorno.

`VITE_*` se incorpora al navegador: no uses ese prefijo para claves secretas de Clerk/Stripe ni credenciales de PostgreSQL. `.env` y sus variantes locales están ignorados por Git; `.env.example` contiene solo ejemplos. El archivo cifrado heredado `.env.gpg` se conserva sin modificar y su contraseña no se documenta en el repositorio.

El backend vive en un repositorio separado, [APIGeneral](https://github.com/JOSY12/APIGeneral). Sigue sus instrucciones para preparar servicios y arrancarlo. Habilita el origen exacto de Vite en su configuración CORS. Este frontend no arranca ni modifica la base de datos.

```powershell
npm run dev
```

## Comandos

| Comando | Función |
| --- | --- |
| `npm ci` | Instala desde el lockfile, también en un checkout limpio |
| `npm run dev` | Servidor local de Vite |
| `npm run format` | Formatea el código, pruebas y configuración |
| `npm run format:check` | Comprueba el estilo sin modificar archivos |
| `npm run lint` | ESLint, sin aceptar advertencias |
| `npm run typecheck:tests` | Comprueba tipos de código y pruebas |
| `npm test` | Pruebas de regresión con Vitest y Testing Library |
| `npm run test:watch` | Pruebas en modo desarrollo |
| `npm run build` | TypeScript y build de producción en `dist/` |
| `npm run check` | Formato, lint, tipos, pruebas y build |
| `npm run test:browser` | Smoke público de lectura con Chrome y frontend/API encendidos |
| `npm run preview` | Sirve el build generado para revisión local |
| `npm audit` | Consulta avisos de las dependencias instaladas |

Las pruebas usan respuestas simuladas y almacenamiento aislado: no llaman a Stripe, Cloudinary ni a una base de datos real. Cubren errores de servicios, filtros, contratos, sesiones, carrito, edición y confirmación de eliminación. No sustituyen las pruebas integradas del backend. El smoke opcional usa un perfil temporal de Chrome, comprueba catálogo/búsqueda/historial/detalle y guarda capturas en `test-results/`. Si Chrome no está en su ubicación habitual, configura `CHROME_PATH`; `FRONTEND_URL` permite cambiar el origen local. No inicia sesión ni crea o borra datos.

## Organización

```text
src/
  app/                  # proveedores, router con carga por ruta y permisos de loaders
  Componentes/          # pantallas existentes; ProductForm compartido en administración
  features/
    catalogo/           # consultas, imágenes y carga del catálogo
    compras/            # carrito, pedidos y checkout
    usuario/            # favoritos, direcciones, notificaciones y administración
  shared/
    api/                # cliente HTTP, sesión, errores, contratos y tareas de usuario
    config/             # configuración pública del entorno
    ui/                 # diálogo y estados de solicitud
    utils/              # filtros de URL
  Zustand/              # estado compartido y acciones asíncronas
  Services.ts           # reexportaciones compatibles para consumidores existentes
tests/                 # pruebas sin servicios reales
docs/                  # contrato de integración
```

No se persisten compras ni otros datos privados en localStorage. Al cambiar sesión se descartan los caches antiguos `micarrito` y `misfavoritos`, y la API vuelve a ser la referencia del carrito. Las respuestas de una sesión anterior se ignoran.

## Rutas y roles

- Públicas: `/`, `/productos`, `/productos/:id`, `/contacto`, `/iniciarsesion`, `/registrar`.
- Con sesión: `/u/perfil`, `/u/notificaciones`, `/u/carrito`, `/u/compras`, `/u/compras/:id`, `/u/favoritos`.
- Administración: `/u/v/admin/usuarios`, `/u/v/admin/productos`, `/u/v/admin/listado_p`, `/u/v/admin/editor/:id`.

El rol visual se obtiene de `user.publicMetadata.administrador === true`. Los guards de la SPA y loaders mejoran navegación; APIGeneral debe comprobar permisos y propiedad en cada endpoint. Las acciones de guardar roles/borrar usuarios que aún no tienen soporte están deshabilitadas. Eliminar productos solicita confirmación antes de llamar a la API.

## Compilación y publicación

La compilación usa el entorno disponible al ejecutar `npm run build`. En el alojamiento configura las variables de ese entorno, usa `npm ci` y publica `dist/`. Conserva las reescrituras SPA de `vercel.json` y comprueba entradas directas a rutas profundas. No se necesita un segundo sistema de despliegue si ya utilizas la integración Git de Vercel.

El workflow de calidad ejecuta las comprobaciones en Linux y Windows. No despliega ni modifica servicios externos. Las pantallas se cargan por ruta; los ajustes de estilos internos de Clerk se han conservado para limitar cambios visuales y requieren comparación en un entorno autenticado al migrar al nuevo SDK de Clerk.

## Documentos

- [Análisis inicial y plan](ANALISIS_Y_PLAN_DE_MEJORAS.md).
- [Contrato con APIGeneral y coordinación de sus cambios](docs/CONTRATO_APIGENERAL.md).
- [Revisión conjunta posterior: compatibilidad, correcciones y prueba local](docs/REVISION_CONJUNTA_API.md).
- [Cambios implementados y límites de validación](MEJORAS_IMPLEMENTADAS.md).

El override puntual de `minimatch` se aplica solo a `@typescript-eslint/typescript-estree` para corregir [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). No modifica los consumidores antiguos de ESLint. Revisarlo al actualizar typescript-eslint.
