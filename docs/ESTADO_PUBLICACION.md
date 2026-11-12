# Estado de la demo de portafolio

Actualizado el 12 de noviembre de 2026. El proyecto conserva todo el recorrido funcional: registro, roles, catálogo, favoritos, direcciones, carrito, Stripe test, pedidos, envío y recepción. Se mantiene la aplicación actual de Clerk Development y la integración Git de Vercel.

## Validación completada

- API: 29 pruebas aprobadas en Node 24 y PostgreSQL local aislado; formato y lint correctos.
- Frontend: 44 pruebas aprobadas, tipos, formato, lint y build correctos.
- Chrome: catálogo, búsqueda, navegación, detalle, login/registro y guards privados verificados.
- Roles reales: 33 comprobaciones con cuentas y sesiones de Clerk, incluidas administración, editor en navegador, aislamiento entre compradores, baneos, retirada de privilegios, envío y borrado de fixtures.
- Recorrido del autor: cuenta, dirección predeterminada, favorito, compra test por USD 20, webhook 200, un pedido, stock 9, carrito vacío, envío y confirmación de recepción. Se conserva su cuenta y pedido de prueba.
- Se borraron las dos últimas cuentas temporales, sus sesiones, el producto y la categoría de pruebas. El estado y la limpieza quedaron verificados.

## Configuración publicada preparada

- Vercel apigeneral: Node 24 y Root Directory=API; proyecto-techsells: Node 24.
- La firma del webhook publicado de Clerk se reemplazó y se guardó como CLERK_WEBHOOK_SIGNING_SECRET cifrada en Vercel, solo para production. El secreto anterior tiene 24 horas de gracia; el del túnel local no cambió.
- Con autorización expresa se guardó un respaldo completo de sena/public en API/.local/backups, ignorado por Git. Contiene datos de la demo y no se publica.
- Las cuatro migraciones locales se aplicaron con autorización expresa a Supabase y su historial quedó alineado con los archivos versionados: api_integrity, guest_checkout_limits, historical_purchase_guards y clerk_optional_email.
- Supabase: 21 tablas de sena con RLS, correo opcional para sincronizar perfiles y acceso anónimo retirado de public.compras_usuario. Esa vista utiliza security_invoker=true. La API accede mediante su rol servidor, no mediante el navegador.

El asesor conserva una recomendación de actualizar el PostgreSQL administrado. No se ejecutó esa actualización del servicio. El aviso informativo de RLS sin políticas es coherente con el acceso exclusivo desde el servidor: no se han creado políticas públicas para abrir las tablas.

## Publicación

Falta publicar los commits de ambos repositorios y comprobar los despliegues automáticos. Se actualizará primero la API y después el frontend, porque los botones de pedidos utilizan los campos de autorización añadidos por la API.

Se conservarán las rutas existentes y Stripe test. Una segunda aplicación Clerk, otra base de ensayo o un proceso adicional de promoción no son requisitos para este portafolio.

## Entornos compartidos

Local y publicado comparten Clerk; ambos reciben sus eventos y pueden guardar los perfiles de las cuentas de prueba. Esto explica las copias de perfiles observadas en Supabase. No hubo una copia del pago manual a Supabase: ese pedido está en la base local. Las afirmaciones anteriores de “producción sin cambios” se corrigieron por ese motivo.

Los volcados database/schema.original.sql y schema.sql son la línea base original sin datos. Las migraciones de supabase/migrations contienen los cambios posteriores. El respaldo completo permanece privado en .local.
