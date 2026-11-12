# Publicación y verificación de la demo de portafolio

Actualizado el 12 de noviembre de 2026. El proyecto conserva todo el recorrido funcional: registro, roles, catálogo, favoritos, direcciones, carrito, Stripe test, pedidos, envío y recepción. Se mantiene la aplicación actual de Clerk Development y la integración Git de Vercel.

## Validación completada

- API: 29 pruebas aprobadas en Node 24 y PostgreSQL local aislado; formato y lint correctos.
- Frontend: 44 pruebas aprobadas, tipos, formato, lint y build correctos.
- Chrome: catálogo, búsqueda, navegación, detalle, login/registro y guards privados verificados.
- Roles reales: 33 comprobaciones con cuentas y sesiones de Clerk, incluidas administración, editor en navegador, aislamiento entre compradores, baneos, retirada de privilegios, envío y borrado de fixtures.
- Recorrido del autor: cuenta, dirección predeterminada, favorito, compra test por USD 20, webhook 200, un pedido, stock 9, carrito vacío, envío y confirmación de recepción. Se conserva su cuenta y pedido de prueba.
- Se borraron las dos últimas cuentas temporales, sus sesiones, el producto y la categoría de pruebas. El estado y la limpieza quedaron verificados.

## Configuración publicada

- Vercel apigeneral: Node 24 y Root Directory=API; proyecto-techsells: Node 24.
- La firma del webhook publicado de Clerk se reemplazó y se guardó como CLERK_WEBHOOK_SIGNING_SECRET cifrada en Vercel, solo para production. El secreto anterior tiene 24 horas de gracia; el del túnel local no cambió.
- Con autorización expresa se guardó un respaldo completo de sena/public en API/.local/backups, ignorado por Git. Contiene datos de la demo y no se publica.
- Las cuatro migraciones locales se aplicaron con autorización expresa a Supabase y su historial quedó alineado con los archivos versionados: api_integrity, guest_checkout_limits, historical_purchase_guards y clerk_optional_email.
- Supabase: 21 tablas de sena con RLS, correo opcional para sincronizar perfiles y acceso anónimo retirado de public.compras_usuario. Esa vista utiliza security_invoker=true. La API accede mediante su rol servidor, no mediante el navegador.

El asesor conserva una recomendación de actualizar el PostgreSQL administrado. No se ejecutó esa actualización del servicio. El aviso informativo de RLS sin políticas es coherente con el acceso exclusivo desde el servidor: no se han creado políticas públicas para abrir las tablas.

## Publicación

Se publicaron los commits `120f0e9` de APIGeneral (`main`) y `e72a97c` de Techsells (`master`), en ese orden. Vercel completó ambos despliegues de producción con estado READY y asignó sus dominios habituales:

- API: https://apigeneral.vercel.app. Despliegue funcional verificado: `dpl_Ca7uqBr16aZ9foNmncKoLRuc4pV5`, Express, Node 24, compilación de unos 11 segundos.
- Frontend: https://proyecto-techsells.vercel.app. Despliegue funcional verificado: `dpl_HUoxPShFwMiTVCqTZf2pt769PE3B`, Vite/React, Node 24, compilación de unos 16 segundos.
- GitHub Actions: API checks y los workflows Calidad/Push on master del frontend terminaron correctamente para esos commits.
- La auditoría actual de npm devuelve cero vulnerabilidades en ambos lockfiles. El aviso que GitHub mostró durante el push del frontend correspondía al análisis disponible en ese momento; se contrastó con los archivos actuales.

### Comprobación pública

Pasaron 12 comprobaciones HTTP: salud, conexión a Supabase, catálogo/categorías, rechazo de acceso anónimo, CORS permitido/rechazado, rechazo de firmas falsas, aceptación de la nueva firma publicada de Clerk y respuesta 404. El diagnóstico firmado utilizó un tipo de evento ignorado y no escribió perfiles.

Chrome verificó catálogo, búsqueda sin resultados, historial/filtros, detalle de producto, vista móvil, guards privados y formularios Clerk en el dominio público. Las consultas públicas respondieron 200 y no hubo excepciones JavaScript.

Pasaron otras 14 comprobaciones autenticadas contra la demo publicada: sesión real de Clerk, sincronización por el webhook del proveedor, restricciones administrativas de comprador, dirección ficticia predeterminada, favoritos y carrito persistidos y visibles en sus pantallas. Las cuentas temporales se eliminaron, sus sesiones se revocaron y los eventos firmados de baja llegaron a Supabase. No quedaron direcciones, favoritos ni carritos de esas cuentas; los perfiles quedaron anonimizados conforme al diseño. Esta prueba no creó pedidos ni pagos.

El pago Stripe test, envío y recepción completos se verificaron anteriormente contra Docker y la base local con el autor. No se repitió ese pago en Supabase durante la comprobación de publicación. La evidencia de despliegue complementa esa prueba; no equivale a una prueba de carga ni garantiza ausencia de cualquier fallo futuro.

### Observación posterior

La revisión inmediata de los registros no mostró fallos 500. Aparecieron rechazos 403 de CORS, incluido el origen inválido usado intencionadamente en la prueba; el dominio público autorizado pasó tanto HTTP como Chrome. No se configuraron servicios adicionales de monitorización ni drains. El frontend no presentó errores de runtime en la ventana consultada.

Las evidencias privadas resumidas están en `.local/published-api-verification.json` y `.local/published-account-verification.json`; las capturas del frontend están en `test-results/`. Esas carpetas permanecen ignoradas por Git. Un commit posterior de documentación registra este cierre sin cambiar el código funcional verificado.

Se conservarán las rutas existentes y Stripe test. Una segunda aplicación Clerk, otra base de ensayo o un proceso adicional de promoción no son requisitos para este portafolio.

## Entornos compartidos

Local y publicado comparten Clerk; ambos reciben sus eventos y pueden guardar los perfiles de las cuentas de prueba. Esto explica las copias de perfiles observadas en Supabase. No hubo una copia del pago manual a Supabase: ese pedido está en la base local. Las afirmaciones anteriores de “producción sin cambios” se corrigieron por ese motivo.

Los volcados database/schema.original.sql y schema.sql son la línea base original sin datos. Las migraciones de supabase/migrations contienen los cambios posteriores. El respaldo completo permanece privado en .local.
