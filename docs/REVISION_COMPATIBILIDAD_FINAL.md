# Revisión de compatibilidad del frontend y APIGeneral

Fecha: 12 de noviembre de 2026. Revisión posterior al cierre de la otra sesión y anterior al rediseño neobrutalista.

## Resolución posterior en el frontend

Los tres hallazgos se atendieron posteriormente en el frontend, por instrucción del usuario, junto al rediseño y el modo oscuro. El backend permaneció intacto. Estado, pruebas y límites de la solución: [REDISENO_NEOBRUTALISTA.md](REDISENO_NEOBRUTALISTA.md). El análisis siguiente conserva las evidencias anteriores a las correcciones.

## Resultado

No se encontraron rupturas en las rutas y formatos revisados. Ambos dominios están publicados con los commits actuales. Las comprobaciones automáticas pasan, pero quedan tres problemas de integración o validación que recomiendo atender antes de cambiar el estilo.

Esta revisión no equivale a garantizar ausencia de errores en todos los flujos. No se modificó código funcional, configuración, datos, pagos ni despliegues.

## Versiones verificadas

| Proyecto | Commit local y publicado | Dominio | Estado en Vercel |
| --- | --- | --- | --- |
| Frontend | `63cd2bca6b73b59b05449c5dca01dc747f49cfc3` | https://proyecto-techsells.vercel.app | READY, production |
| APIGeneral | `6f1b7052baa8ed8be6f031386efc64ea4866b52f` | https://apigeneral.vercel.app | READY, production |

Despliegues actuales: frontend `dpl_GScwbuZT5H2ZEY852ZsuXr9WZK7X`; API `dpl_DC7UyZgAtY8nNXxvAziNf9eK12R7`.

La compilación local apunta a `http://localhost:3000`; la publicada apunta a `https://apigeneral.vercel.app/sena`. Por eso sus hashes de JavaScript difieren. Se confirmó el destino correcto en el bundle publicado, la misma clave publicable de Clerk y respuestas JavaScript correctas en los 19 imports detectados. No se imprimieron claves ni se modificó `.env`.

## Hallazgos pendientes

### 1. Los reintentos del frontend no aprovechan la idempotencia del checkout

Prioridad: media, atender primero por afectar al proceso de compra.

Evidencia:

- `src/features/compras/api.ts`, función `comprar_stripe`, envía `{ idproducto }` sin `Idempotency-Key`.
- `src/Zustand/Stripe_store.ts` evita solicitudes simultáneas, pero al fallar permite reintentar y no conserva una clave del intento.
- `APIGeneral/API/src/checkout.js`, función `requestKey`, genera un UUID nuevo cuando falta la cabecera. La reutilización de un intento depende de usuario + clave.
- El mismo archivo crea reservas antes de solicitar la sesión a Stripe. Las reservas activas no vencidas cuentan para comprobar disponibilidad.
- Una comprobación local de esa función confirmó que dos solicitudes sin cabecera producen claves diferentes y que una cabecera estable conserva la clave. No realizó llamadas externas.

Consecuencia inferida del código: si la API alcanza a crear el intento y la respuesta se pierde o falla posteriormente, pulsar de nuevo puede crear otro intento y otra reserva, o devolver stock insuficiente por la reserva anterior. Esto no demuestra un cobro duplicado ni un incidente ocurrido en producción.

Propuesta: conservar una clave por intento de compra y reutilizarla ante resultados inciertos. Renovarla cuando cambien carrito/dirección, cuando venza o se cierre el intento, y al cambiar de sesión. Coordinar el comportamiento de cancelar y volver a pagar con el backend. No basta con generar una clave nueva en cada POST.

Validación posterior: simular respuesta perdida tras crear la sesión, reintentar y comprobar una sola sesión/reserva; comprobar también cambios de carrito, dirección, sesión y vencimiento. Las pruebas existentes de idempotencia del backend sí envían la cabecera, por lo que no cubren esta omisión del frontend.

### 2. El editor bloquea productos con inventario bajo

Prioridad: media. Es una restricción previa del frontend, no una regresión introducida por la última publicación.

Evidencia:

- `src/Componentes/Administracion/ProductForm.tsx:265` exige un mínimo de 5 unidades cuando el estado es Disponible, tanto al crear como al editar.
- `APIGeneral/API/src/validation.js:9` acepta stock entero desde 0. Una comprobación directa del esquema aceptó un producto Disponible con stock 4.
- `APIGeneral/API/src/fulfillment.js` descuenta unidades tras comprar; solo cambia el estado a Agotado cuando llega a 0.

Ejemplo: un producto con 5 unidades pasa a 4 tras una venta. Si el administrador abre el editor y modifica únicamente la descripción, el formulario bloquea el guardado por el stock existente.

Propuesta: permitir guardar inventarios válidos en edición sin exigir reponer unidades. Separar esa validación del mínimo que se decida mantener para crear productos. Revisar también el máximo de edición (1.000) frente a existencias válidas más altas; ampliar los límites de creación sigue siendo una decisión de producto.

Validación posterior: editar un producto con 1 y con 4 unidades y comprobar que el stock no se altera; seguir rechazando negativos y fracciones.

### 3. Faltan límites de texto equivalentes a los de la API

Prioridad: baja. El servidor rechaza los valores y los formularios conservan el borrador; el problema es que el usuario descubre el límite después del envío.

| Campo | Límite del backend | Frontend |
| --- | --- | --- |
| Título de comentario | 150 | `Agregar_comentario.tsx`: sin máximo |
| Cuerpo de comentario | 5.000 | `Agregar_comentario.tsx`: sin máximo |
| Descripción de producto | 10.000 | `ProductForm.tsx`: sin máximo |
| Nombre de categoría | 100 | `ProductForm.tsx`: sin máximo |
| Nombre de comprador / ciudad | 200 | `Modal.tsx`: sin máximo |
| Dirección | 500 | `Modal.tsx`: sin máximo |
| Nota de dirección | 1.000 | `Modal.tsx`: sin máximo |
| Código postal / teléfono | 30 / 40 | `Modal.tsx`: sin máximo |

Los esquemas locales confirmaron el rechazo de un título de 151 caracteres, descripción de 10.001 y teléfono de 41. No se enviaron esos datos a la API publicada.

Propuesta: añadir máximos y mensajes coherentes en los formularios y validar texto después de recortar espacios, manteniendo la validación del servidor.

## Comprobaciones realizadas en esta revisión

- Frontend: `npm run check` completo correcto: Prettier, ESLint sin advertencias, tipos de pruebas, **44 pruebas en 10 archivos**, TypeScript de aplicación y build Vite.
- El primer intento de Vitest no pudo leer el directorio padre por el aislamiento de esbuild. Se repitió fuera de ese aislamiento y terminó correctamente; no fue un fallo del proyecto.
- Backend: `npm test` correcto, **5 pruebas sin base real**. Incluyen validación, paginación de Stripe, CORS, guardas de herramientas locales y disponibilidad ante caída simulada de PostgreSQL. Los mensajes ENOTFOUND/503 emitidos en esta última prueba son esperados y simulados.
- Producción: `/health` y `/ready` respondieron 200.
- Catálogo, categorías y portada respondieron 200 con las claves y tipos esperados.
- Filtro con `Categorias[]`, página 2, rango de precios y búsqueda sin resultados correctos.
- Detalle público y comentarios con formatos compatibles; identificador inválido devuelve 400 controlado.
- Catálogo administrativo, carrito y usuarios rechazan acceso anónimo con 401.
- CORS permite el origen exacto de la tienda con credenciales; preflight acepta Authorization y Content-Type; un origen ajeno devuelve 403.
- La página y sus imports JavaScript responden correctamente. Las rutas profundas comprobadas sirven el shell de la SPA; esto no verifica su renderizado.
- Se contrastaron métodos, payloads y autorización de catálogo, productos, categorías, direcciones, favoritos, carrito, notificaciones, comentarios y compras entre los servicios del frontend y los routers/controladores actuales.
- Se confirmó que el frontend usa `puede_marcar_enviado` y `puede_marcar_recibido`, y que el servidor calcula esos permisos y vuelve a autorizarlos al escribir.
- Se conservan el contrato de checkout como string HTTPS, perfiles con correo nulo y las rutas locales de acceso de Clerk.

## Alcance y continuidad

El host de acceso al navegador y el canal nativo de control no estuvieron disponibles. No se pudo repetir la inspección visual, consola JavaScript o recorrido autenticado en esta sesión. No se crearon cuentas, compras ni fixtures, ni se repitieron migraciones o pruebas que reescriben bases de datos.

Las pruebas previas de roles, aislamiento entre compradores, pago Stripe test, webhook y recepción siguen documentadas en [REVISION_CONJUNTA_API.md](REVISION_CONJUNTA_API.md) y [ESTADO_PUBLICACION.md](ESTADO_PUBLICACION.md). Son evidencia de la otra sesión, no ejecuciones nuevas de esta revisión. No se repitió un pago en el despliegue público.

Siguiente paso recomendado: acordar y corregir los tres hallazgos, añadir regresiones de checkout e inventario y volver a comprobar esos casos. Después se puede trabajar el estilo neobrutalista para la tienda de tecnología conservando rutas, permisos y lógica comercial.
