# Versiones comprobadas y reproducibilidad

Consulta del registro oficial npm y Node: 13 de noviembre de 2026 UTC (12 de noviembre en Bogotá).

## Política

Se utilizan versiones exactas en dependencies/devDependencies, sin ^, ~ ni latest. Los dos package-lock.json registran las versiones e integridades de las dependencias indirectas. Usa npm ci para instalar desde el lockfile; los cambios de versiones y del lockfile son operaciones explícitas. .npmrc establece save-exact=true para que las siguientes instalaciones también guarden versiones exactas. No se añadió ninguna tarea de actualización automática.

- Node local y CI: **26.13.1 LTS**, fijado en .nvmrc. La máquina host no se modifica globalmente con este cambio; selecciona esa versión con tu gestor de Node o instálala desde el proveedor.
- Docker API: **Node 26.13.1 Alpine**, con digest SHA-256 fijo. Se conserva Alpine porque la API no requiere módulos nativos obligatorios; una futura dependencia nativa debe comprobarse con musl.
- npm de referencia: **11.21.2**, declarado en packageManager y utilizado explícitamente por CI/Docker/instalación de Vercel. npm 12.2.2 es más reciente, pero Vercel documenta soporte integrado hasta npm 11; se conserva la rama compatible.
- PostgreSQL local, CI y pg_dump: **15.19 Alpine**, con digest fijo, conservando el motor 15 del proyecto. No se migró la base Supabase alojada a otra versión mayor.
- GitHub Actions checkout **v7.0.1** y setup-node **v7.1.0**, fijadas a sus SHA completos y comprobadas contra sus releases oficiales.

Las versiones de imagen solo cambian si se modifica el tag/digest deliberadamente. Fijarlas también requiere revisar e incorporar expresamente correcciones futuras.

## Límites de compatibilidad

- TypeScript: **6.0.3**, última versión 6.0 estable disponible. TypeScript 7.0.2 es más reciente, pero typescript-eslint 8.72.2 declara soporte >=4.8.4 <6.1.0. No se ignoran sus peer dependencies para forzar la instalación.
- Clerk React: se migra el paquete retirado @clerk/clerk-react a **@clerk/react 6.18.7**, se sustituyen SignedIn/SignedOut por Show y se fija **@clerk/ui 1.42.5** dentro del bundle mediante ui={ui}. Esto fija el paquete de interfaz; el servicio remoto de Clerk sigue siendo administrado por su proveedor.
- Vite: **8.3.8**, con plugin React SWC **4.3.3**. Se retira la configuración antigua de manualChunks en formato objeto, que Vite 8 ya no admite, y se utiliza su división de código y las páginas cargadas de forma diferida.
- Vitest: **5.1.0**; ESLint: **10.14.0**. Se ajustan formularios, estado de fotos y tema a las comprobaciones nuevas. Las dos barreras de sincronización de sesión/router conservan comentarios y excepciones locales de la regla set-state-in-effect: evitan montar loaders con credenciales o cachés de otra sesión.
- minimatch **11.0.8** se fija mediante override para resolver el aviso de seguridad de las versiones indirectas que selecciona ESLint. path-to-regexp permanece en **8.4.2**, compatible con Express 5; no se fuerza su versión mayor 9 sobre un consumidor de la rama 8.
- El SDK de Stripe está en su versión estable actual **23.1.0**. La versión de contrato de la API de Stripe continúa siendo la configurada por el proyecto; actualizar el SDK no cambia automáticamente el contrato de los webhooks ni los endpoints del proveedor.

Vercel admite **26.x**, pero administra los parches y versiones menores del runtime. No permite congelar allí Node exactamente en 26.13.1 con la configuración de runtime habitual. La selección local/Docker/CI sí está fijada. Las versiones de servicios externos, navegador y sistema del host tampoco se congelan mediante package-lock.json.

## Dependencias directas

| Proyecto | Paquete                       | Versión exacta |
| -------- | ----------------------------- | -------------- |
| API      | `@clerk/express`              | `2.1.89`       |
| API      | `cors`                        | `2.8.6`        |
| API      | `dotenv`                      | `18.0.10`      |
| API      | `express`                     | `5.3.0`        |
| API      | `helmet`                      | `8.3.0`        |
| API      | `pg`                          | `8.23.1`       |
| API      | `stripe`                      | `23.1.0`       |
| API      | `zod`                         | `4.6.7`        |
| API      | `eslint`                      | `10.14.0`      |
| API      | `globals`                     | `17.14.0`      |
| API      | `prettier`                    | `3.10.1`       |
| API      | `supertest`                   | `7.3.2`        |
| Frontend | `@clerk/localizations`        | `4.24.7`       |
| Frontend | `@tailwindcss/vite`           | `4.3.5`        |
| Frontend | `axios`                       | `1.21.1`       |
| Frontend | `react`                       | `19.3.1`       |
| Frontend | `react-dom`                   | `19.3.1`       |
| Frontend | `react-hook-form`             | `7.92.0`       |
| Frontend | `react-icons`                 | `5.7.0`        |
| Frontend | `react-router-dom`            | `7.18.5`       |
| Frontend | `sonner`                      | `2.0.8`        |
| Frontend | `tailwindcss`                 | `4.3.5`        |
| Frontend | `zustand`                     | `5.1.0`        |
| Frontend | `@clerk/react`                | `6.18.7`       |
| Frontend | `@clerk/ui`                   | `1.42.5`       |
| Frontend | `@eslint/js`                  | `10.0.1`       |
| Frontend | `@testing-library/react`      | `16.3.3`       |
| Frontend | `@testing-library/user-event` | `14.6.10`      |
| Frontend | `@types/estree`               | `1.0.10`       |
| Frontend | `@types/node`                 | `26.6.6`       |
| Frontend | `@types/react`                | `19.3.0`       |
| Frontend | `@types/react-dom`            | `19.3.0`       |
| Frontend | `@vitejs/plugin-react-swc`    | `4.3.3`        |
| Frontend | `eslint`                      | `10.14.0`      |
| Frontend | `eslint-plugin-react-hooks`   | `7.1.1`        |
| Frontend | `eslint-plugin-react-refresh` | `0.5.7`        |
| Frontend | `globals`                     | `17.14.0`      |
| Frontend | `jsdom`                       | `31.0.0`       |
| Frontend | `prettier`                    | `3.10.1`       |
| Frontend | `typescript`                  | `6.0.3`        |
| Frontend | `typescript-eslint`           | `8.72.2`       |
| Frontend | `vite`                        | `8.3.8`        |
| Frontend | `vitest`                      | `5.1.0`        |

## Comprobación

Se ejecutan instalación desde lockfile, formato, lint, tipos y suites existentes, además de build y navegador con proveedores reales antes de publicar. Los resultados definitivos del despliegue se registran al cerrar la actualización. No se cambian variables secretas ni datos de negocio para fijar las dependencias.

Fuentes: [Node LTS](https://nodejs.org/en/about/previous-releases), [Node en Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [gestores de Vercel](https://vercel.com/docs/package-managers), [compatibilidad typescript-eslint](https://typescript-eslint.io/users/dependency-versions/), [Clerk Core 3](https://clerk.com/docs/guides/development/upgrading/upgrade-guides/core-3), [Vite 8](https://vite.dev/guide/migration).

## Validaci?n de la actualizaci?n

Comprobado el 14 de noviembre de 2026: formato y lint correctos; 5 pruebas unitarias y 25 de integraci?n de API, y 76 pruebas del frontend aprobadas. Compilaci?n correcta con Vite 8 y TypeScript 6. npm audit devuelve cero vulnerabilidades en ambos proyectos. Chrome comprueba cat?logo, b?squeda, detalle, vista m?vil, guards y formularios de Clerk. Pasaron 22 comprobaciones adicionales con sesiones reales de comprador/administrador, permisos, direcciones, favoritos, carrito, retirada de privilegios y suspensi?n; las cuentas temporales se eliminaron y los eventos de baja se verificaron tambi?n en Supabase. No se generaron pagos adicionales.
