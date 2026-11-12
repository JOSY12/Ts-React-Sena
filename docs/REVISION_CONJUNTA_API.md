> Cierre de publicación, 12 de noviembre de 2026: ambos repositorios están publicados en GitHub y desplegados en Vercel. Pasaron la navegación pública y 14 comprobaciones autenticadas de la demo. Los fixtures se limpiaron. Estado vigente y alcance exacto: [ESTADO_PUBLICACION.md](ESTADO_PUBLICACION.md). Las secciones siguientes conservan resultados e hitos anteriores.

# Revisión conjunta de Techsells y APIGeneral

Fecha: 12 de noviembre de 2026. Incluye los cambios locales de la otra sesión en `C:/Users/Josmer/Ts-React-Sena`. No se hizo commit, push, despliegue ni migración remota.

Estado posterior a las pruebas descritas aquí: las cuatro migraciones alojadas ya están aplicadas con autorización expresa, el respaldo privado está guardado y Vercel quedó configurado con Node 24 y la firma del webhook publicado. Pasaron 33 comprobaciones de roles; producto, categoría y cuentas temporales se eliminaron. El pedido manual quedó enviado y recibido, verificado en PostgreSQL. Las pruebas finales mantienen 29/29 en API y 44/44 en frontend. Pendiente publicar los commits y verificar Vercel; véase PREPARACION_DESPLIEGUE.md.

Actualización de alcance: demo de portafolio con la aplicación actual de Clerk y Stripe test. Pasaron posteriormente 27 comprobaciones de roles con sesiones reales. La limpieza de los últimos fixtures quedó pendiente del revisor automático. Los webhooks compartidos copiaron perfiles de prueba también a Supabase. Véase [ESTADO_PUBLICACION.md](ESTADO_PUBLICACION.md), que actualiza los pendientes originales de este informe.

## Resultado

Se conservaron la reorganización y los cambios del frontend. Las rutas, métodos, payloads y respuestas principales coinciden con esta API. La revisión encontró diferencias concretas en administración, perfiles sin correo y redirecciones de Clerk, que se corrigieron en ambos proyectos.

El recorrido es: React obtiene la sesión de Clerk, Axios envía su token a APIGeneral, el servidor comprueba permisos y consulta PostgreSQL local. Los callbacks de desarrollo llegan por el túnel HTTPS configurado.

## Compatibilidad

| Área                             | Comprobación                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| Configuración                    | API `http://localhost:3000/sena`; CORS y authorizedParties permiten `http://localhost:5173` |
| Clerk                            | Misma clave publicable/instancia de desarrollo en ambos proyectos; no se imprimieron claves |
| Stripe                           | Clave test y retorno al frontend local, `/u/compras` o `/u/carrito`                         |
| Catálogo                         | `Categorias[]`, filtros, paginación, claves de respuesta y normalizadores compatibles       |
| Productos                        | Detalle público con strings y editor con objetos de fotos/categorías conservados            |
| Carrito, favoritos y direcciones | Coinciden métodos, cuerpos, IDs y claves de respuesta                                       |
| Notificaciones y comentarios     | Coinciden rutas y formatos de los servicios                                                 |
| Checkout                         | `{ idproducto }` y URL como string JSON HTTPS conservados                                   |

## Correcciones realizadas

1. **Lectura administrativa de pedidos.** El listado enlaza a `/u/compras/:id`, pero la API bloqueaba al administrador al abrir un pedido ajeno. Ahora puede leerlo y marcar su envío. Un comprador sigue sin poder leer pedidos ajenos; confirmar recepción sigue limitado al propietario.
2. **Botones del pedido.** La API añade a cada fila `puede_marcar_enviado` y `puede_marcar_recibido`, calculados según usuario y estado. El frontend utiliza esas banderas. Las escrituras vuelven a validar los permisos en el servidor; el navegador no otorga autorización.
3. **Listado de usuarios.** La vista heredada omitía el ID y concatenaba el nombre con un apellido que podía ser nulo. La consulta administrativa devuelve ahora `id`, `nombre` y `apellido` separados, además de los demás campos esperados.
4. **Perfiles sin correo.** Los tipos del frontend admiten nulos. La interfaz muestra “Sin correo registrado” y evita enlaces `mailto:null`. La API sigue exigiendo correo para comprar.
5. **Rutas de acceso.** La protección anónima abría el Account Portal externo de Clerk. Se configuraron `signInUrl=/iniciarsesion` y `signUpUrl=/registrar` en ClerkProvider para conservar las páginas de la tienda. Referencia: [rutas personalizadas de Clerk](https://clerk.com/docs/react/guides/development/custom-sign-up-page).
6. **Script de Chrome.** Se amplió para verificar guards privados y formularios de Clerk. Se corrigió una carrera del propio script esperando al documento antes de leer su contenido.

Al publicar, actualizar primero APIGeneral y después el frontend: los nuevos botones de pedidos dependen de las banderas añadidas por la API. Las rutas anteriores siguen disponibles.

## Verificación

- Frontend: formato, lint, tipos, **44 pruebas en 10 archivos** y build correctos. Cuatro regresiones nuevas comprueban acciones autorizadas/denegadas, incluido un administrador que compra para sí mismo.
- API: formato, lint y **29 pruebas** correctas; suite combinada repetida en Linux con Node 24 y PostgreSQL real aislado. Incluye acceso administrativo, rechazo entre compradores y recepción solo por el propietario.
- Chrome: catálogo, búsqueda sin resultados, navegación atrás y detalle en escritorio/móvil correctos; respuestas públicas 200, sin excepciones JavaScript.
- Chrome: carrito y administración sin sesión redirigen al login local sin consultar datos privados. Los formularios locales de inicio de sesión y registro de Clerk se renderizaron correctamente; no se creó ninguna cuenta durante la comprobación.
- El ejemplo enviado desde Clerk ya recibió 200 y guardó usuario, carrito y permisos locales.

Capturas: `Ts-React-Sena/test-results/`, ignorado por Git. Evidencia del ejemplo de Clerk: `API/.local/clerk-provider-verification.json`, sin datos personales.

## Entorno y primera prueba manual

Frontend: `http://localhost:5173`. API: `http://localhost:3000`; `/ready` comprueba PostgreSQL. Base manual: `apigeneral_local`; base automática separada: `apigeneral_test`. Vite corre en segundo plano; su PID y logs están en `API/.local/frontend-server.json`, `frontend.stdout.log` y `frontend.stderr.log`. Mantener Docker y el túnel activos para los callbacks.

Antes de la prueba manual, una consulta de solo lectura a Clerk Development encontró cero cuentas. Después del registro realizado por el usuario se confirmó una cuenta de desarrollo real y su perfil sincronizado. Los usuarios del seed y el ejemplo del dashboard no sirven para iniciar sesión.

1. Abrir `http://localhost:5173/registrar` y crear una cuenta de pruebas con un correo que puedas verificar. El webhook debe crear el perfil local y el registro llevarte al catálogo.
2. Abrir `/u/perfil`, añadir una dirección ficticia y marcarla como predeterminada.
3. Abrir el producto demo local de USD 20, agregarlo a favoritos y al carrito, y comprobar su cantidad.
4. Avisar al completar esos pasos para comprobar la sesión y su sincronización. Después se realiza la compra Stripe test y su callback.

La cuenta nueva es compradora. No se concedieron privilegios administrativos para superar las protecciones. La validación con una cuenta administradora real queda pendiente.

## Resultado de la primera prueba manual

El usuario completó registro, dirección predeterminada, favorito y carrito desde el frontend. A las 14:37:40 UTC del 12 de noviembre se relacionó la cuenta de Clerk Development con su ID en PostgreSQL local, sin imprimir datos personales. Se verificaron perfil sincronizado con correo, permisos de comprador activo, una dirección y una predeterminada, un favorito y un artículo/unidad en el carrito por USD 20 con stock disponible. Aún no había intentos de checkout ni compras de esa cuenta.

También se consultó en lectura Stripe: endpoint de pruebas habilitado, evento checkout.session.completed suscrito y URL coincidente con el túnel vigente. El /ready público respondió 200; el retorno de pago sigue apuntando a localhost:5173. Evidencia resumida: API/.local/real-user-precheckout-verification.json. Esa preparación se completó después con el pago descrito a continuación.

## Compra Stripe test completada

El usuario completó el Checkout en su navegador y regresó a la tienda. A las 14:42:19 UTC del 12 de noviembre se verificó en lectura la misma sesión en Stripe, el evento del proveedor, la petición capturada en ngrok y PostgreSQL local:

- Stripe: livemode=false, status=complete, payment_status=paid, importe USD 20 y moneda USD. La referencia del pago coincide con la guardada en el pedido.
- Webhook checkout.session.completed originado por Stripe: entrega HTTP 200 y un registro del evento procesado.
- Un pedido local, estado “Compra exitosa”, procesado, sin requiere_revision; intento de checkout “completado”.
- Una unidad comprada a USD 20, artículo coincidente con el snapshot del intento, stock actual 9 y reserva consumida.
- Dirección histórica coincidente con el snapshot fijado al iniciar Checkout, sin imprimir sus datos personales.
- Carrito vacío, favorito y dirección predeterminada conservados, una notificación de compra y una fila tanto en historial como en detalle.

Resultado: recorrido comprador → frontend → API → Stripe test → webhook → pedido local verificado. Evidencia resumida sin datos personales: API/.local/real-payment-verification.json. La comprobación no creó otro pago ni reenvió el evento.

## Límites

Registro, operaciones privadas y una compra con Stripe test se comprobaron con las acciones del usuario, Stripe y persistencia local. Pasaron después 27 comprobaciones con administrador y segundo comprador reales. Falta limpiar los últimos fixtures y publicar/verificar los cambios. La prueba adicional de marcar el pedido como enviado y borrar los fixtures no se ejecutó por el límite del revisor automático. Los perfiles temporales también se sincronizan con Supabase al compartir Clerk. No hubo despliegue ni migración alojada. Clerk React 5 y el preset unsigned de Cloudinary conservan los límites documentados por la otra sesión.
