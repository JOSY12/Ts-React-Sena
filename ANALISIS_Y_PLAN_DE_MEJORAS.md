# Análisis técnico y plan de mejoras de Techsells

> Documento histórico de la revisión inicial. Para el resultado de la implementación y las verificaciones actuales, consulta [MEJORAS_IMPLEMENTADAS.md](MEJORAS_IMPLEMENTADAS.md). Las referencias a líneas y a archivos renombrados describen la versión revisada originalmente.

Fecha: 11 de noviembre de 2026. Base revisada: rama `master`, commit `8048bd0`.

## 1. Objetivo y conclusión

Profesionalizar el proyecto conservando sus pantallas, rutas, funcionalidades y contratos actuales con el backend. Este documento propone cambios; no aplica refactorizaciones ni elimina archivos de la aplicación.

El proyecto ya tiene una base aprovechable: React, TypeScript con modo estricto, Vite, Tailwind, React Router, Clerk, formularios con React Hook Form y estado con Zustand. Incluye catálogo, categorías, búsqueda, detalle de producto, favoritos, carrito, direcciones, compras, notificaciones y administración. **Recomiendo mejorarlo de forma incremental y mantener esta tecnología.** Una reescritura o una migración de framework añadirían riesgo sin resolver primero los problemas encontrados.

Las prioridades son recuperar verificaciones confiables, separar errores de respuestas válidas, sincronizar correctamente sesión y estado, y corregir inconsistencias de datos. Después conviene reducir duplicación y ordenar los módulos. Los cambios visuales y las funcionalidades nuevas pueden esperar.

## 2. Alcance y evidencia de la revisión

Se inspeccionaron la estructura, configuración, rutas, servicios HTTP, ocho stores y los componentes de los flujos principales. El repositorio contiene 59 archivos TypeScript/TSX y aproximadamente 7.117 líneas en esos archivos. También se revisaron referencias entre módulos y recursos para identificar candidatos a limpieza.

### Comprobaciones realizadas

| Comprobación | Resultado observado |
| --- | --- |
| Estado inicial de Git | Rama `master`, sin cambios locales versionados. |
| Variables de entorno | `.env` existe y Git lo ignora. Se comprobaron nombres y uso sin reproducir valores. |
| Entorno de ejecución de esta revisión | Node `26.11.1`, npm `11.20.0`, Windows. No constituyen todavía una matriz de versiones soportadas por el proyecto. |
| `npm ci` | Falla con `EUSAGE`: faltan entradas de dependencias opcionales de plataforma en el lockfile, por ejemplo SWC, esbuild, Rollup y Lightning CSS. |
| Instalación para diagnóstico | `npm install --no-save --no-audit --no-fund`. No modificó `package.json` ni `package-lock.json`. Las versiones instaladas de React, React DOM, Vite, Axios, React Router DOM, Clerk y TypeScript coinciden con sus entradas del lockfile. |
| `npm run build` | **Pasa**: TypeScript y Vite generan `dist`. Fue necesario ejecutar con acceso normal a archivos porque el aislamiento impedía a esbuild leer el directorio padre; ese primer fallo era del entorno. |
| Tamaño del build | JS principal: **633,96 kB**, **186,20 kB gzip**. CSS: **47,53 kB**. Vite advierte que un chunk supera 500 kB. No se midieron tiempos reales de carga en navegador. |
| `npm run lint` | **Falla antes de analizar el código**, por una regla mal configurada en `eslint.config.js`. |
| Diagnóstico adicional de ESLint | Con esa única configuración corregida **en memoria**, sin editar archivos: **30 errores y 16 advertencias** en `src` y `vite.config.ts`. No equivale a que el comando original funcione. |
| Auditoría de dependencias | `npm audit --package-lock-only --json`: **24 paquetes señalados**, con 3 severidades críticas, 16 altas, 3 moderadas y 2 bajas. Es una fotografía del registro consultado, no una demostración de que todos los avisos sean explotables en esta SPA. |
| API configurada | Apunta a un servidor local. Fallaron las conexiones de lectura a `/pu/productos`, `/pu/categorias` y `/pu/inicio_landing_page`. |
| Pruebas automatizadas existentes | No se encontraron archivos de pruebas ni un script `test` en el repositorio revisado. |

### Límites de las conclusiones

El repositorio revisado es el frontend; no contiene la implementación de la API. No se validaron sesiones reales, permisos del servidor, escritura de datos, cargas a Cloudinary ni cobros de Stripe. Tampoco se realizó una revisión visual en navegador. Que el build pase demuestra que compila, no que todos esos flujos funcionen.

Los hallazgos siguientes distinguen **hechos del código**, **riesgos derivados de esos hechos** y **verificaciones pendientes del backend**. No debe interpretarse la indisponibilidad del servidor local como un fallo del servidor de producción.

## 3. Orden de prioridades

| Prioridad | Trabajo | Motivo |
| --- | --- | --- |
| P1 | Reparar lint y reproducibilidad de instalación | Permitir detectar regresiones antes de modificar funcionalidades. |
| P1 | Revisar avisos de dependencias y gestión del entorno | Reducir exposición con actualizaciones controladas y configuración clara. |
| P1 | Corregir propagación de errores y éxitos falsos | Evitar pérdida de formularios y estados que aparentan haberse guardado. |
| P1 | Aislar datos por sesión y preparar autenticación antes de loaders privados | Evitar datos residuales y solicitudes privadas sin token listo. |
| P1 | Corregir cantidades del carrito y validar contratos del detalle | Proteger los flujos de compra y presentación de productos. |
| P2 | Unificar URL, filtros y carga de datos | Evitar consultas duplicadas y navegación desincronizada. |
| P2 | Extraer formulario compartido de productos y servicios por dominio | Reducir errores al mantener creación y edición. |
| P2 | Estados de carga/error/vacío, accesibilidad y controles incompletos | Hacer la aplicación más clara y confiable. |
| P3 | División del bundle, recursos, convenciones y documentación ampliada | Mejorar carga y mantenimiento sobre una base estable. |

P1 significa atender primero; no significa que se haya confirmado una intrusión ni un cobro incorrecto. Varias tareas requieren reproducir el caso con el backend antes de implementar la solución.

## 4. Hallazgos y cambios recomendados

### 4.1. Recuperar el lint y una instalación reproducible — P1

**Evidencia:** `eslint.config.js:23` introduce `'react-hooks/exhaustive-deps'` dentro de las opciones de `react-refresh/only-export-components`. ESLint rechaza esa estructura. Además, `npm ci` rechaza el lockfile en el entorno descrito.

**Propuesta:** dejar la regla de React Refresh con sus opciones válidas y configurar las reglas de hooks por su propio nombre. La configuración recomendada de hooks ya se está extendiendo; no hace falta insertar el nombre de otra regla como argumento.

```js
'react-refresh/only-export-components': [
  'warn',
  { allowConstantExport: true }
]
```

Después hay que resolver los diagnósticos reales: 15 usos explícitos de `any`, 13 expresiones rechazadas por `no-unused-expressions`, un tipo `String`, una variable sin usar y 16 advertencias de dependencias de efectos. Algunas expresiones son ternarios o cortocircuitos con efectos laterales; que ESLint las rechace no demuestra por sí solo un fallo funcional. Usar `if` puede expresar mejor su intención.

Regenerar o completar el lockfile con una versión acordada de Node/npm y comprobar `npm ci` desde una instalación limpia en Windows y Linux. No borrar el lockfile como solución permanente ni actualizar todas las versiones mayores en este mismo cambio.

**Aceptación:** un checkout limpio instala con `npm ci`, compila y ejecuta lint sin errores de configuración. Registrar la versión de Node/npm soportada y conservar el lockfile actualizado.

### 4.2. Actualizar dependencias por grupos pequeños — P1

**Evidencia:** el lockfile fija, entre otras, React `19.1.0`, Vite `6.3.4`, Axios `1.9.0`, React Router DOM `7.5.3` y Clerk React `5.31.2`. La auditoría del lockfile devuelve los avisos resumidos arriba; incluye dependencias directas como Axios, Clerk, React Router DOM y Vite, además de transitivas.

**Propuesta:** revisar cada aviso por versión, función utilizada y entorno afectado. Separar dependencias que llegan al navegador de herramientas de desarrollo y de rutas de ejecución exclusivas de Node/SSR. Este proyecto usa una SPA; un aviso de SSR o middleware no implica automáticamente que esa ruta exista aquí.

Actualizar por grupos: autenticación, cliente HTTP, router y herramientas de compilación. Elegir versiones corregidas compatibles después de revisar sus notas de migración. React y React DOM deben mantenerse alineados. Declarar `@clerk/types` directamente si se conserva su importación: actualmente se importa en `Compra.tsx` y `Detalles_compra.tsx`, pero depende de su presencia transitiva.

**Aceptación:** repetir auditoría, build y los casos funcionales del grupo actualizado. Documentar los avisos que sigan pendientes y su aplicabilidad. Evitar `npm audit fix --force` como corrección masiva sin revisión.

### 4.3. Separar respuestas válidas y errores — P1

**Evidencia:** `src/Services.tsx` captura numerosos errores y devuelve `error`, `error.response.data` o `[]`. El consumidor continúa después del `await` como si hubiera éxito. Ejemplos:

- `Admin_Productos.tsx:73` limpia el formulario después de `crear_producto`, incluso si el servicio devuelve un error.
- `Editor_productos.tsx:76` muestra otro éxito y limpia datos después de `actualizar_producto`.
- `Agregar_comentario.tsx:31` limpia el comentario sin comprobar éxito.
- `obtener_direcciones` devuelve `[]` también cuando la petición falla: la interfaz pierde la distinción entre error y ausencia de direcciones.

**Propuesta:** adoptar un contrato uniforme: servicios que lanzan errores tipados, o un resultado discriminado `{ ok, data, error }`. Elegir uno. Migrar cada servicio junto con sus consumidores; cambiar todos los `catch` a `throw` de una vez dejaría rechazos sin tratar en varios componentes y stores.

Mover gradualmente los mensajes de interfaz fuera de los servicios HTTP, conservar lo escrito cuando una operación falla y mostrar éxito solo después de confirmación. Añadir estado de envío para evitar dobles clics. También cerrar los avisos de carga en todas las ramas; por ejemplo, `historial_compras` crea un toast cuyo identificador no se usa en sus errores.

**Aceptación:** simular error de red, 400, 401, 403 y 500. Un fallo no limpia el formulario, no muestra éxito ni se presenta como una lista vacía válida.

### 4.4. Aislar datos por usuario y limpiar el estado al salir — P1

**Evidencia:** `Carrito_store.ts:137` persiste con la clave fija `micarrito`; incluye carrito, compras y detalle de compra. `Favoritos_store.ts:48` usa `misfavoritos`. No existe una selección `partialize` ni una limpieza al cerrar sesión. `Logout.tsx` delega en Clerk y `Layout.tsx:61` solicita datos cuando hay sesión, pero no los resetea cuando desaparece. Direcciones, notificaciones y URL de checkout también permanecen en stores en memoria.

**Riesgo:** otro usuario del mismo navegador podría ver contadores o datos residuales mientras se recarga la información. Las compras pueden permanecer almacenadas localmente más de lo necesario. El aislamiento entre usuarios no debe depender de que la siguiente petición llegue rápido.

**Propuesta:** centralizar el cambio de sesión, vaciar todos los datos del usuario saliente y descartar respuestas pendientes de esa sesión. Persistir únicamente lo necesario, con claves asociadas al usuario si se decide conservar esa persistencia. Preferir no persistir compras ni sus detalles. Definir cómo se retiran las claves antiguas sin perder el carrito confirmado por el servidor.

**Aceptación:** usuario A → cerrar sesión → usuario B, con red lenta y con recarga. B nunca observa información de A. Las respuestas tardías de A no repueblan el store.

### 4.5. Preparar autenticación antes de las peticiones privadas — P1

**Evidencia:** el router se crea en `main.tsx:39` y tiene loaders privados. El interceptor que obtiene el token se registra posteriormente desde un efecto de `Layout.tsx:41`. No se guarda su identificador ni se elimina al desmontar; una bandera `useRef` evita repetirlo dentro de esa instancia. Los guards de rutas son componentes de renderizado.

**Riesgo:** en una entrada directa a una ruta privada, un loader puede ejecutarse antes de que el efecto instale el interceptor o de que Clerk esté listo. Ocultar un `<Outlet />` no sustituye la autorización de los loaders ni del servidor. La reproducción concreta depende también de las cookies y del backend.

**Propuesta:** definir una única integración de sesión para el cliente HTTP, disponible antes de las cargas privadas, con espera explícita de autenticación. Si se conserva un interceptor creado en un efecto, limpiarlo con `eject` y manejar correctamente su reinstalación. No limitarse a agregar cleanup mientras la bandera impide volver a registrarlo en Strict Mode.

Mantener los controles visuales por rol y verificar en la API la validez del token, rol administrativo y propiedad de cada recurso. Esto último queda pendiente porque el backend no está en este repositorio.

**Aceptación:** abrir y recargar directamente `/u/compras/:id`, `/u/v/admin/usuarios` y `/u/v/admin/editor/:id`. Probar visitante, comprador y administrador; distinguir carga de sesión, 401 y 403.

### 4.6. Hacer consistentes las mutaciones del carrito y otros stores — P1

**Evidencia:** `Carrito_store.ts:42` inserta localmente `{ id, cantidad: 1 }`, aunque recibe otra cantidad que sí envía al servidor. Además, modifica cantidades o elimina elementos antes de confirmar la API. Favoritos y direcciones tienen operaciones similares sin recuperación del estado previo. Los servicios que absorben errores agravan esta diferencia.

**Propuesta:** respetar la cantidad solicitada; validar entero positivo y límites de stock; tratar un identificador inexistente sin acceder a `item[0]` de forma insegura. Elegir entre actualización después de éxito o actualización optimista con reversión. Sincronizar con la respuesta del servidor cuando esta defina los valores finales.

Las acciones asíncronas de los stores están declaradas mayoritariamente como `() => void`. Declararlas como `Promise<void>` o con el resultado real permitirá a los consumidores esperar y manejar el fallo. Al cambiar la firma, revisar también los eventos que disparan acciones sin esperarlas.

**Aceptación:** agregar tres unidades produce tres en cliente y servidor; aumentar y reducir respetan límites; un rechazo de la API no deja un estado ficticio. Probar clics rápidos para evitar respuestas que se apliquen fuera de orden.

### 4.7. Definir modelos de API y modelos internos coherentes — P1/P2

**Evidencia:** `types.tsx:124` define `producto.fotos` como `Foto[]`, con `{ public_id, url }`, y categorías como objetos. El detalle público trata las fotos como strings y convierte categorías directamente a texto/URL (`DetallesProducto.tsx:32`, `125`, `160`). El editor sí maneja fotos como objetos. `Productos_store.ts:16` tipa sus setters con un solo producto aunque luego comprueba un arreglo.

**Interpretación:** hay una incompatibilidad interna entre tipos y consumidores. No está confirmado si la API devuelve formatos distintos para lectura y escritura; hay que comprobarlo con el backend activo.

**Propuesta:** definir contratos diferenciados cuando corresponda: resumen de producto, detalle público, producto editable y payload de creación/edición. Adaptar respuestas en el límite de la API; no modificar a ciegas el JSON esperado por el servidor. Validar respuestas críticas y datos persistidos con guards o esquemas pequeños. Sustituir `any`, `String`, casts y campos opcionales que actualmente ocultan datos ausentes.

**Aceptación:** una respuesta real o fixture representativo produce fotos, categorías y formularios correctos; respuesta incompleta o producto inexistente muestra un estado controlado. Los filtros y setters aceptan exactamente los tipos que consumen.

### 4.8. Evitar cargas repetidas y efectos que sobrescriben datos — P2

**Evidencia:** `Layout.tsx` carga catálogo y portada globalmente; `Productos.tsx` vuelve a cargar catálogo. Carrito, favoritos y perfil solicitan datos que también obtiene el layout. `DetallesProducto.tsx:42` tiene un efecto dependiente de `producto` que escribe `producto` y vuelve a pedir comentarios. Usa el producto previo para seleccionar la foto antes de guardar el nuevo. Su rama alternativa activa `isLoading` sin una salida explícita en esa rama.

**Propuesta:** asignar un responsable a cada carga. Aprovechar los loaders existentes para datos de rutas y mantener en Zustand solo el estado compartido que lo necesite. Revisar los efectos por intención, separar selección de imagen de carga de datos y cancelar o ignorar respuestas obsoletas.

En `main.tsx:106`, `loader: todo_productos` pasa los argumentos del router a una función que espera filtros de catálogo; además `Listar_productos.tsx` no consume ese loader y realiza una carga administrativa aparte. Reemplazarlo por un adaptador con argumentos correctos o retirarlo tras comprobar que no aporta datos necesarios.

**Aceptación:** navegar de producto A a B actualiza información, foto, comentarios y cantidad; no se queda mostrando A. El catálogo no se carga simultáneamente desde varios propietarios. Mantener Strict Mode y corregir los efectos que pone en evidencia.

### 4.9. Usar la URL como referencia de filtros y paginación — P2

**Evidencia:** filtros y paginación actualizan la URL y disparan solicitudes directamente. `Productos.tsx:13` y `Listar_productos.tsx:20` leen los parámetros solo al montar. `Layout.tsx` contiene otro parseo con la variante `Categoria` frente a `Categorias`. Catálogo público y administrativo comparten un mismo objeto de filtros en Zustand.

**Riesgo:** los botones de atrás/adelante, enlaces a categorías y cambios entre listados pueden dejar URL, selección del formulario y resultados desincronizados. Una respuesta lenta de una búsqueda anterior puede sobrescribir la más reciente.

**Propuesta:** crear un parseador/serializador único con valores por defecto y validaciones para página, categorías y rango de precios. Derivar la búsqueda desde la URL, usando un loader o un hook responsable, y sincronizar el formulario. Separar el contexto público del administrativo. Evitar detección de modo mediante `window.location.pathname.includes('admin')`; pasar el modo explícitamente o usar contexto de ruta.

**Aceptación:** una URL compartida reproduce los filtros; atrás/adelante restaura controles y resultados; parámetros inválidos se normalizan; cambiar filtros reinicia la página; catálogo y administración no contaminan sus resultados.

### 4.10. Unificar creación y edición de productos — P2

**Evidencia:** `Admin_Productos.tsx` y `Editor_productos.tsx` duplican estructura, categorías, subida de fotos, reglas y preview. Ya difieren en límites de stock: creación permite hasta 30 y edición hasta 1.000. No hay una justificación de negocio documentada para esa diferencia.

**Propuesta:** extraer un `ProductForm` tipado, validaciones compartidas, selector de categorías, carga de imágenes y preview. Mantener wrappers de creación/edición que definan carga inicial y guardado. Acordar los límites de negocio con el contrato de la API antes de unificarlos.

En edición, conservar los valores guardados y reconciliar la respuesta de la API. Actualmente se vacían fotos y categorías tras guardar, sin una recarga explícita del producto. Evitar borrar el contenido del editor mientras el usuario sigue en la misma ruta.

**Aceptación:** misma apariencia y payloads actuales; editar sin tocar fotos ni categorías las conserva; fallar al guardar conserva el borrador; crear un producto correctamente sí puede resetear el formulario.

### 4.11. Robustecer las subidas de imágenes — P2

**Evidencia:** `Services.tsx:389` sube directamente a Cloudinary con configuración escrita en el código. Los formularios convierten el resultado con `as Foto` aunque la función puede devolver un error. La carga se dispara desde un efecto basado en `fotoslist.length`, y los botones de guardado no tienen una coordinación explícita con la subida en curso.

**Propuesta:** configurar los identificadores públicos del proveedor por entorno; validar tipo, tamaño, resultado y máximo de imágenes; usar actualizaciones funcionales al agregar fotos; bloquear guardado mientras una subida necesaria esté pendiente. Conservar las imágenes actuales si la subida falla.

Comprobar las restricciones del upload preset en Cloudinary. Que el nombre del preset sea visible no demuestra por sí solo una vulnerabilidad: la protección depende de su configuración. Evaluar subidas firmadas desde backend si se necesita autorización más estricta. No eliminar recursos remotos automáticamente al quitar una foto del formulario: primero definir si son compartidos y cómo se confirma el guardado.

**Aceptación:** archivo inválido, límite excedido, error de proveedor y cargas consecutivas se manejan sin crear fotos inválidas ni perder las anteriores.

### 4.12. Consolidar checkout y estados de compra — P1/P2

**Evidencia:** `Stripe_store.ts` almacena una URL global; `Carrito.tsx:20` redirige al cambiar esa URL. No existe un estado explícito de checkout pendiente ni limpieza al cambiar sesión. En `Carrito_store.ts:102`, envío y recepción se marcan localmente después de servicios que pueden devolver errores y luego se recarga toda la página.

**Propuesta:** limpiar la URL de checkout, evitar múltiples solicitudes simultáneas y redirigir solo con una respuesta válida. Documentar el contrato actual donde `pagar('')` compra el carrito completo y `pagar(id)` compra un producto, antes de sustituir ese valor especial por un modelo interno más claro.

Actualizar el pedido confirmado y sus listas relacionadas sin `window.location.reload()`. Centralizar formato monetario y moneda sin cambiar importes ni reglas actuales. El total del frontend debe seguir siendo informativo: precios, stock, autorización, confirmación de pago e idempotencia se verifican en el backend y con Stripe. Esas garantías quedan pendientes de inspección del servidor.

**Aceptación:** compra individual y completa, pago cancelado, fallo de checkout y confirmación de envío/recepción conservan su comportamiento. Probar con entorno de pago de prueba y usuarios de prueba, sin cobros reales.

### 4.13. Mostrar carga, vacío y error por separado — P2

**Evidencia:** `Productos.tsx:34` muestra un skeleton cuando el arreglo está vacío, incluso si la búsqueda terminó sin resultados. Varios stores convierten respuestas no válidas en `[]`. `Error.tsx` muestra siempre 404 y también se usa como `errorElement` raíz.

**Propuesta:** modelar `idle`, `loading`, `success` y `error`, manteniendo los datos previos cuando sea útil. Mostrar “sin resultados” solo para una búsqueda exitosa vacía y ofrecer reintento en errores recuperables. Distinguir recurso inexistente, falta de permisos y fallo de servicio en las páginas de error. Evitar que un error de catálogo aparezca como ruta inexistente.

**Aceptación:** cada estado tiene un resultado visible coherente; no hay skeleton infinito para cero productos ni falsos “no tienes direcciones” al fallar la API.

### 4.14. Corregir contadores y controles incompletos — P2

**Evidencia:** `Sidebar.tsx:24` actualiza el contador solo cuando hay notificaciones; al pasar a cero puede conservar el número anterior. `Notificaciones_store.ts:36` marca visto en la API sin reflejarlo localmente. `Notificaciones.tsx` puede marcar y recargar sin esperar el orden de esas operaciones. `Admin_usuarios.tsx:16` recarga usuarios y estadísticas, pero no compras.

También hay acciones visibles sin implementación completa:

- “Guardar cambios” de usuario no tiene handler en `Usuarios_card_administracion.tsx:122`.
- “Borrar” en `Modal_recursivo.tsx:16` solo cierra el modal, como “Cancelar”.
- “Eliminar” en `Producto_administrado.tsx:72` no tiene acción.

**Propuesta:** derivar el contador del estado actual, sincronizar el marcado de lectura y recargar todas las secciones pertinentes. Para los controles incompletos, decidir entre implementarlos con soporte de API y permisos, o deshabilitarlos con una explicación. No conectarlos directamente a borrados reales como parte de una limpieza de código.

**Aceptación:** el contador llega a cero correctamente; las acciones no aparentan guardar o borrar algo que no hacen. Los controles que sí funcionaban siguen disponibles.

### 4.15. Mejorar accesibilidad y navegación sin rediseñar — P2

**Evidencia:** `index.html:2` declara inglés en una aplicación en español. Hay imágenes sin `alt` descriptivo y botones solo con iconos en productos y notificaciones. `Modal.tsx` depende de un checkbox oculto y de `document.getElementById` para cerrar; no implementa gestión explícita del foco. Se anidan botones dentro de enlaces en varios componentes. La navegación activa del dashboard se mantiene como estado manual.

**Propuesta:** declarar `lang="es"`, asociar labels e inputs, nombrar botones, usar semántica de enlace o botón según la acción, y permitir teclado y foco visible. Dar al modal apertura controlada, nombre accesible, cierre con Escape y devolución del foco. Usar `NavLink` para estados activos y `Link` para navegación interna cuando corresponda; por ejemplo el logo del navbar actualmente usa un `href` que recarga la aplicación.

**Aceptación:** se completan navegación, filtros, formularios y modal con teclado; los cambios conservan colores, composición y funcionalidades actuales. Comprobar móvil y escritorio antes de integrar.

### 4.16. Dividir responsabilidades y ordenar módulos — P2/P3

**Evidencia:** `Services.tsx` reúne unas 620 líneas de catálogo, usuarios, direcciones, notificaciones, imágenes, administración y pagos, además de mensajes visuales. `main.tsx` mezcla arranque, proveedores, configuración y loaders de todas las rutas. `types.tsx` contiene tipos sin JSX. `Layout.tsx` coordina muchas solicitudes ajenas al layout visual.

**Propuesta de estructura gradual:**

```text
src/
  app/                 # proveedores, router y layout
  features/
    catalogo/          # componentes, servicios, tipos y estado del catálogo
    carrito/
    compras/
    favoritos/
    direcciones/
    notificaciones/
    administracion/
  shared/
    api/               # cliente HTTP y errores comunes
    config/            # validación del entorno
    ui/                # elementos realmente reutilizados
    utils/             # dinero, fechas y parámetros
```

Mover primero un dominio y mantener reexportaciones temporales desde `Services.tsx` cuando ayuden a evitar cambios simultáneos en todos los consumidores. No crear carpetas o abstracciones vacías. Usar `.ts` para tipos y servicios sin JSX; acordar nombres consistentes sin renombrar todo junto con correcciones funcionales. Mantener las rutas públicas existentes.

**Aceptación:** cada movimiento es verificable por separado; los endpoints y payloads permanecen iguales salvo una corrección de contrato comprobada con backend.

### 4.17. Reducir carga inicial y dependencia de recursos externos — P3

**Evidencia:** `main.tsx` importa estáticamente todas las pantallas, incluida administración. El build concentra unos 634 kB en un JS principal. El logo de navegación depende de otro sitio y varias imágenes de respaldo provienen de enlaces externos extensos.

**Propuesta:** cargar por demanda las pantallas pesadas o administrativas con las capacidades del router existente y medir el resultado. Evitar cargas globales de datos que no necesita la ruta actual. Centralizar los respaldos de imágenes, usar los recursos propios adecuados y definir dimensiones y tratamiento de error.

No basta con elevar el umbral de advertencia de Vite: eso oculta el aviso sin reducir lo descargado. Tampoco conviene memorizar cada componente antes de medir un problema real.

**Aceptación:** comparar tamaño transferido y navegación antes/después; las rutas cargadas por demanda funcionan al abrirse directamente y muestran un estado de carga controlado.

### 4.18. Hacer estable la configuración y documentar el proyecto — P1/P3

**Evidencia:** `vite-env.d.ts` declara variables de Auth0 que no se usan en el código activo, pero no declara explícitamente las dos variables que usa la aplicación: `VITE_AXIOS_BASE_URL` y `VITE_CLERK_PUBLISHABLE_KEY`. El README contiene instrucciones básicas, sin arquitectura, contratos, pruebas o preparación del backend. `App.css` depende de clases internas de Clerk y utiliza valores CSS como `height: screen`, que no son válidos.

**Propuesta:** agregar validación de configuración al inicio y un `.env.example` con nombres y valores ficticios. Retirar las referencias a Auth0 cuando se confirme que no quedan integraciones externas. Explicar que las variables `VITE_*` usadas por el frontend se incluyen en el cliente: la clave publicable de Clerk es pública por diseño; claves secretas de servidor o Stripe no deben colocarse ahí.

El `.env.gpg` está versionado. Revisar si sigue siendo necesario distribuir configuración cifrada en Git; preferir un mecanismo de secretos por entorno y documentar su preparación. Si se conserva el archivo cifrado, usar una contraseña robusta y entregarla por un canal separado. No se reproduce aquí la contraseña usada en esta sesión ni ningún valor del entorno.

Reemplazar gradualmente estilos apoyados en clases internas generadas de Clerk por personalización soportada, comparando login, registro y perfil antes/después. Completar README con propósito, tecnologías, Node/npm soportados, instalación, API local, comandos, variables, roles, flujos principales, limitaciones conocidas y proceso de despliegue. Conservar y comprobar las reescrituras SPA existentes al abrir rutas directamente.

**Aceptación:** otra persona puede preparar el entorno y verificar el proyecto siguiendo el README; la falta de configuración produce un mensaje claro; login, registro y perfil conservan su presentación.

## 5. Qué borrar, qué conservar y qué condicionar

Nada de esta sección se ha borrado durante la revisión. Los candidatos se identificaron mediante búsqueda y análisis de imports estáticos desde `src/main.tsx`; antes de eliminarlos, repetir la comprobación sobre la rama donde se implemente.

| Elemento | Recomendación | Comprobación necesaria |
| --- | --- | --- |
| `src/Componentes/Buscador.tsx` | Borrar: componente vacío, fuera del grafo activo. | Confirmar que no se va a usar en trabajo pendiente. |
| `src/Componentes/Iniciarsesionboton.tsx` y `Registrarboton.tsx` | Borrar si se mantiene la navegación actual de login/registro: no tienen imports activos desde la aplicación. | No confundirlos con `Iniciarsesion.tsx` y `Registrar.tsx`, que sí son pantallas utilizadas. |
| `src/Componentes/Administracion/Productos_comprados.tsx` | Candidato a borrar: módulo no alcanzado por el grafo activo. | Confirmar que no hay una pantalla pendiente que deba reutilizarlo. |
| `testproducto` en `Services.tsx:572` | Borrar: helper exportado sin consumidores, con carga de datos de prueba comentada. | Una herramienta de seed futura debería ser independiente y usar un entorno de prueba. |
| `obtener_usuario`, `editar_direccion` y `borrar_categoria` | Candidatos a retirar por falta de imports activos en `src`. | Confirmar consumidores externos y necesidades pendientes. `borrar_categoria` contiene además un `:` literal antes del ID; contrastar el endpoint si se decide reutilizarlo. |
| Imports, formularios y peticiones antiguas comentadas | Retirar bloques obsoletos y ejemplos de plantilla sin función actual. | Conservar comentarios que expliquen decisiones o restricciones reales. El historial de Git conserva versiones anteriores. |
| Efecto vacío de `DashboardGeneral.tsx:15` | Borrar al revisar ese componente. | No cumple una sincronización ni produce comportamiento. |
| Logs de compras y depuración | Retirar o convertir en registro de desarrollo sin datos personales. | Ejemplos: `Detalles_compra.tsx:28`, `Productos.tsx:15`, `Services.tsx:517`. |
| `.pixel` y reglas CSS inválidas/obsoletas | Candidatos a retirar o corregir después de comparar pantallas. | Evitar borrar todos los estilos de Clerk de una vez: algunos sí afectan la apariencia. |
| `src/img/download.webp` | Candidato a borrar: no se encontraron referencias por nombre en código, HTML o CSS. | Comprobar recursos esperados fuera del frontend. |
| Los tres archivos `tech-sells-high-resolution-logo*` de `src/img` | Decidir primero cuál sustituirá al logo remoto; borrar únicamente los restantes si no se necesitan. | Son recursos propios potencialmente útiles, aunque hoy no estén referenciados. |
| `src/img/images.webp` | **Conservar**: se usa como favicon y aparece en el build. | Revisar el path con doble `/` en `index.html`, sin eliminar el recurso. |
| `Modal_recursivo.tsx` y `Producto_administrado.tsx` | **Conservar y corregir**: tienen consumidores activos. | Su comportamiento incompleto no los convierte en código muerto. |
| `package-lock.json`, guards, stores y `.env.gpg` | No borrarlos como limpieza general. | El lockfile se repara; autenticación y estado se refactorizan con pruebas; la configuración cifrada requiere una decisión de gestión del entorno. |

No se identificó una dependencia de ejecución claramente prescindible solo por falta de uso. No quitar Zustand, Axios, React Router, Clerk o React Hook Form por preferencia personal. Revisar aparte dependencias de tipos y herramientas cuando el lint y la instalación estén estables.

## 6. Plan de ejecución para preservar lo que funciona

### Etapa 0 — Fijar la referencia funcional

Levantar el backend correspondiente, preparar usuarios comprador/administrador de prueba y confirmar el entorno de Stripe. Registrar rutas, payloads, reglas de stock, moneda y capturas de las pantallas principales. Resolver las dudas sobre fotos y categorías con respuestas reales anonimizadas. Esta referencia permite evaluar cada cambio posterior.

### Etapa 1 — Recuperar verificaciones

Reparar configuración de lint, acordar Node/npm, corregir el lockfile y obtener instalación limpia. Registrar avisos de dependencias y planificar sus actualizaciones por separado. Agregar una comprobación de CI con instalación, build y lint cuando estos comandos sean fiables. No ocultar diagnósticos para obtener un resultado verde.

### Etapa 2 — Corregir riesgos funcionales prioritarios

Migrar errores y consumidores de una operación completa cada vez. Después, aislar estado por sesión, ordenar autenticación/loaders, corregir cantidades y normalizar contratos del detalle. Introducir pruebas de regresión sobre estos comportamientos antes o junto con sus cambios.

### Etapa 3 — Simplificar la organización

Unificar filtros y carga de datos; extraer formulario de producto; separar servicios por dominio; eliminar candidatos confirmados de código muerto. Hacer renombrados y movimientos en cambios separados de los que modifican lógica para facilitar la revisión y reversión.

### Etapa 4 — Pulir experiencia y mantenimiento

Completar estados de interfaz y accesibilidad, decidir los controles administrativos pendientes, estabilizar estilos de Clerk, optimizar bundle y recursos, y completar documentación. Cualquier funcionalidad nueva se evalúa aparte de la refactorización.

Para cada cambio: registrar el comportamiento esperado, limitar el alcance, ejecutar las verificaciones pertinentes y revisar su diff. Integrar en pasos pequeños y reversibles. No modificar rutas, nombres de parámetros o contratos de API solo para que el código se vea más uniforme.

## 7. Matriz mínima de regresión

Las comprobaciones siguientes son propuestas para la implementación; no figuran como pruebas superadas en esta revisión.

| Flujo | Casos que deben mantenerse o corregirse | Criterio de aceptación |
| --- | --- | --- |
| Portada y catálogo | Entrada directa, navegación desde portada, red lenta, API caída, cero resultados. | Datos correctos y estados de carga/error/vacío diferenciados. |
| Filtros y paginación | Nombre, categorías, rango, combinación, URL compartida, atrás/adelante. | URL, formulario, página seleccionada y productos coinciden. |
| Detalle de producto | A → B sin recarga, ID inexistente, fotos/categorías ausentes. | No quedan datos del producto anterior ni una carga infinita. |
| Sesión | Login, registro, logout, recarga y cambio de A a B. | Redirecciones actuales e información aislada por usuario. |
| Favoritos | Agregar/quitar con éxito, error y clics repetidos. | Estado final consistente con servidor, sin falsos éxitos. |
| Carrito | Agregar varias unidades, límites, quitar y rechazo de stock. | Cantidades y totales coherentes con la respuesta válida del servidor. |
| Direcciones | Crear, quitar, predeterminar, duplicado y fallo de API. | Se conservan datos ante error y no se confunde fallo con lista vacía. |
| Comentarios | Crear, validar, fallo de API y cambio de producto. | Formulario y listado se actualizan solo cuando corresponde. |
| Checkout | Producto individual, carrito completo, doble clic, error y cancelación. | Una redirección válida y estado pendiente controlado; verificar en modo de prueba. |
| Compras | Listado, detalle, envío y recepción por rol. | Estados confirmados y permisos conservados. |
| Administración | Acceso directo como visitante, comprador y administrador. | Guards visuales y autorización de API coherentes; sin depender de navegación previa. |
| Productos administrativos | Crear, editar conservando fotos, subir imágenes y fallo de guardado. | Sin pérdida del borrador ni cambios accidentales del payload. |
| Notificaciones | Marcar visto, borrar, borrar todas y recargar. | Contador y listado coinciden, incluido cero. |
| Presentación | Móvil, escritorio, teclado, modal y widgets de Clerk. | Mismo diseño general, controles accesibles y foco predecible. |
| Compilación y despliegue | Instalación limpia, build y rutas profundas. | Build reproducible y rutas existentes accesibles directamente. |

Automatizar primero los casos con mayor riesgo: parseo de filtros, contratos de API, cantidades y reversión del carrito, aislamiento por sesión y errores de formularios. Después cubrir algunos recorridos completos de comprador y administrador en un entorno de prueba. Evitar pruebas que solo copien la implementación o capturas masivas de detalles internos.

## 8. Mejoras opcionales y decisiones que pueden esperar

- Evaluar una biblioteca de caché de consultas solo si, después de ordenar loaders y stores, sigue habiendo complejidad relevante de invalidación y sincronización. No es un requisito para resolver los hallazgos.
- Añadir paginación con ventanas de páginas si el catálogo crece: hoy se genera un botón por cada página en `Paginado.tsx`.
- Introducir seguimiento de errores sin datos sensibles cuando se defina el entorno de producción y quién atenderá esos errores.
- Establecer formato automático y convenciones de nombres para código nuevo; evitar reformatear todo mientras se corrigen fallos funcionales.
- Documentar el modelo de permisos, estados de pedido y contratos de API conjuntamente con el backend.

No recomiendo una migración a Next.js, sustituir el proveedor de autenticación, agregar SSR, reescribir el backend o cambiar el diseño como paso previo. Ninguna de esas decisiones es necesaria para las mejoras aquí identificadas.

## 9. Referencias de soporte

Los hallazgos concretos provienen del código y de los comandos descritos. Estas fuentes oficiales respaldan los mecanismos recomendados; no sustituyen la comprobación de compatibilidad con las versiones elegidas al implementar.

- [Vite: variables de entorno y modos](https://vite.dev/guide/env-and-mode): exposición de variables al frontend.
- [React: useEffect](https://react.dev/reference/react/useEffect): dependencias y limpieza de efectos.
- [React Router: carga de datos](https://reactrouter.com/start/data/data-loading): datos asociados a las rutas.
- [Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist): selección de estado persistido, versiones y migración.
- [npm: install](https://docs.npmjs.com/cli/v11/commands/npm-install/): instalación y control de guardado de manifiestos.
- [npm: audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/): interpretación y seguimiento de avisos de dependencias.

## 10. Resultado entregado

Se entrega este análisis y un plan para ejecutar mejoras conservando la funcionalidad. Durante la revisión se instalaron dependencias locales y se generó `dist`, ambos ignorados por Git. No se modificaron el código de la aplicación, los manifiestos, el lockfile ni el `.env`, y no se realizaron operaciones de escritura en la API ni cobros.
