# Contrato de integración con APIGeneral

## Ajustes posteriores exclusivos del frontend

Checkout mantiene el cuerpo `{ idproducto }` y añade `Idempotency-Key`, conservada por contexto y sesión para reintentos inciertos. Antes de enviarlo consulta carrito y direcciones actuales; CORS local admite la cabecera. El editor admite stock entero de 0 a 10.000.000; crear conserva 5–30. Los formularios reflejan los máximos de texto del backend y las cantidades de compra se limitan a 10.000. No cambió ninguna ruta, esquema o archivo de APIGeneral. Implementación y límites: [REDISENO_NEOBRUTALISTA.md](REDISENO_NEOBRUTALISTA.md).

## Revisión conjunta posterior del 12 de noviembre

Se contrastó este inventario con el código actual de ambos repositorios. GET /u/detalle_compra/:id permite lectura del propietario o de un administrador; las filas añaden puede_marcar_enviado y puede_marcar_recibido para mostrar acciones. La recepción sigue siendo exclusiva del propietario. GET /u/usuarios devuelve id, nombre y apellido separados; email y foto_perfil pueden ser nulos. ClerkProvider configura /iniciarsesion y /registrar como rutas locales. Publicar primero la API y después el frontend para disponer de las nuevas banderas. Pruebas, evidencias y recorrido manual: [REVISION_CONJUNTA_API.md](REVISION_CONJUNTA_API.md).

## Inventario original

La base `VITE_AXIOS_BASE_URL` incluye `/sena`. Se conservaron las URLs, métodos y claves existentes. Este inventario se contrastó con el informe y el código local de APIGeneral mientras su refactorización estaba en curso; no representa una verificación de su despliegue.

## Autenticación y permisos

Clerk prepara la sesión antes de crear el router. El cliente HTTP obtiene el token actual y envía `Authorization: Bearer …`; se conserva `withCredentials`. Un cambio de sesión invalida respuestas pendientes y limpia datos privados del frontend.

El catálogo administrativo conserva `/pu/productos_admin`, aunque ahora requiere un administrador. Los loaders privados comprueban sesión y los administrativos comprueban el rol antes de consultar la API. El servidor sigue siendo responsable de autorizar cada operación y comprobar propiedad de recursos.

Se manejan 401, 403, 404, 429 y errores de servidor sin presentarlos como éxito. Se acepta el contrato de error actual `{ error: string }`, además de `{ message: string }` y `{ error: { message: string } }`.

## Lecturas

| Método y ruta | Respuesta utilizada |
| --- | --- |
| `GET /pu/productos` | `{ Productos: [], totalPaginas, Pagina }` |
| `GET /pu/productos_admin` | Igual que catálogo; solo administrador |
| `GET /pu/inicio_landing_page` | `{ Recientes: [], Valorados: [] }` |
| `GET /pu/productos/:id` | `{ producto: [...] }`; fotos/categorías públicas como strings |
| `GET /p/detalle_producto_editar/:id` | `{ producto: [...] }`; fotos `{ url, public_id }`, categorías `{ id, nombre }` |
| `GET /pu/categorias` | `[{ id, nombre }]` |
| `GET /pu/comentarios/:id` | `{ comentarios: [...] }` |
| `GET /u/carrito`, `/u/favoritos`, `/u/mis_compras`, `/u/detalle_compra/:id` | `{ rows: [...] }` |
| `GET /u/direcciones`, `/u/notificaciones` | Array directo |
| `GET /u/usuarios` | `{ usuarios: [], datos: objeto o array, compras: [] }` |

Por compatibilidad se acepta **solo** el mensaje heredado `{ error: 'No hay productos disponibles' }` como listado/portada vacíos exitosos. Otros objetos de error no se convierten en listas vacías.

Filtros: `Nombre`, `Minimo`, `Maximo`, `Pagina` y categorías serializadas por Axios como `Categorias[]`. La URL visible de la SPA conserva `Categorias=A,B`. No sustituir una representación por la otra en el servidor sin coordinarlo.

## Escrituras y checkout

| Método y ruta | Payload |
| --- | --- |
| `POST /p/crear_producto`, `PUT /p/productos/:id` | `{ nombre, precio, stock, estado, descripcion, fotos, categorias }` |
| `DELETE /p/productos/:id` | Sin body; confirmación explícita en interfaz |
| `POST /p/crear_categoria` | `{ nombre }` |
| `POST /p/crear_comentario` | `{ titulo, comentario, producto_id, calificacion }` |
| `POST /u/agregar_carrito`, `PUT /u/carrito_cantidad` | `{ idproducto, cantidad }` |
| `DELETE /u/quitar_carrito/:id` | Sin body |
| `POST /u/agregar_favorito` | `{ idfavorito }` |
| `DELETE /u/quitar_favorito/:id` | Sin body |
| `POST /u/agregar_direccion` | `{ nombre_comprador, ciudad, direccion, nota, codigo_postal, telefono, predeterminada }` |
| `PUT /u/predeterminar_direccion` | `{ id_direccion }` |
| `DELETE /u/eliminar_direccion/:id` | Sin body |
| `PUT /u/marcar_enviado`, `/u/marcar_recibido` | `{ idcompra }` |
| `PUT /u/marcar_visto`, `DELETE /u/notificaciones/:id`, `DELETE /u/borrar_todas_notificaciones` | Sin body |
| `POST /stripe_compras/comprar` | `{ idproducto }`; `''` conserva la compra del carrito completo |

Checkout devuelve un string JSON con la URL HTTPS. El frontend no envía precios ni destinos de retorno. La fuente de precios, validación de stock/dirección, reservas e idempotencia pertenece a APIGeneral/Stripe.

Una dirección duplicada con respuesta exitosa HTTP pero texto `ya existe` se interpreta como fallo de negocio. El formulario conserva lo escrito. En el carrito y los favoritos, un agregado idempotente puede devolver `ya existe`: después se consultan los datos confirmados.

## Acuerdos que necesitan validación conjunta

- CORS de la API debe permitir el origen exacto del frontend local/preview y el token de la misma instancia de Clerk.
- Probar con dos compradores y un administrador: logout, entradas directas, 401/403, propiedad de compras y cambios de rol.
- Probar checkout y webhooks en Stripe test; estos cambios no crean pagos ni aplican migraciones.
- Creación/edición conservan los límites de stock previos del frontend (30/1.000), máximo cuatro fotos y tres categorías. La API admite límites más amplios; ampliarlos en la interfaz sería una decisión de producto separada.
- No se añadieron escrituras de roles ni borrado administrativo de usuarios: no hay un contrato administrativo confirmado para esas acciones. Sus controles pendientes están deshabilitados.
- La suite del frontend simula respuestas HTTP; la integración real se completa cuando la otra sesión tenga la API preparada y su entorno de pruebas disponible.
