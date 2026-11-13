# Frontend: correcciones, rediseño y modo oscuro

12 de noviembre de 2026. Entrega verificada y autorizada por el usuario para subir a GitHub. El backend no se modificó.

## Correcciones funcionales

- Checkout envía `Idempotency-Key` usando el contrato actual de APIGeneral. Antes de pagar lee carrito y direcciones actuales para identificar el intento por selección, cantidades, precios y dirección predeterminada.
- Una respuesta perdida conserva la clave. Se recupera al recargar o regresar en la misma pestaña y sesión, mientras el contexto coincida y no hayan pasado 35 minutos. Los contextos anteriores también se recuerdan durante ese intervalo.
- Cambios de sesión invalidan los intentos anteriores. Una sesión que cambie mientras se prepara el pago impide enviar el POST. Si la API confirma que un intento venció o terminó, el siguiente reintento obtiene una clave nueva.
- El almacenamiento de checkout contiene claves aleatorias, identificador de sesión, caducidad y hashes: no contiene dirección, correo ni artículos en texto plano. Si sessionStorage está bloqueado, los reintentos se conservan solo durante la visita actual, en memoria.
- Cambiar carrito o dirección puede crear un intento distinto. Las reservas previas siguen bajo control del backend y sus plazos; el frontend no cancela reservas ni sesiones de Stripe.
- El editor permite guardar stock entero entre 0 y 10.000.000, incluidos productos que quedaron con 1–4 unidades después de vender. La creación conserva el mínimo de 5 y máximo de 30 existentes.
- Los formularios de comentarios, descripción, categorías y direcciones validan los máximos de la API antes de enviar. Se recortan espacios de los campos de texto y se conservan los borradores ante errores.
- Las cantidades de compra respetan el máximo de 10.000 de la API. El detalle utiliza un campo numérico, en lugar de generar una opción por cada unidad del inventario.

## Diseño

Paleta crema, tinta negra, verde lima, violeta y naranja suave. Bordes definidos, sombras sólidas, composición por bloques y titulares de peso alto. Sin fuentes externas ni dependencias nuevas.

- Portada nueva con producto destacado real, categorías, valoraciones y novedades de la API. No se inventaron descuentos, puntuaciones ni garantías comerciales.
- Catálogo con tarjetas consistentes, filtros adaptados a móvil, estados de carga/error y paginación.
- Detalle con galería de miniaturas accesibles, estado de existencias, cantidades y acciones de carrito/favoritos.
- Carrito con resumen, acceso a la dirección predeterminada y ayuda de Stripe test conservada en un desplegable.
- Navegación y pie renovados; menú con enlaces absolutos, acceso administrativo según el rol existente y cierre con Escape/restauración de foco. Se eliminaron enlaces con botones anidados en los componentes reescritos.
- Formularios de acceso y contacto renovados; superficies y controles compartidos aplican el tema al resto de pantallas.
- Estados de foco visibles, enlace para saltar al contenido, nombres accesibles en iconos y respeto de movimiento reducido.

## Modo oscuro

El botón de luna/sol está en la cabecera y funciona también en móvil. Recuerda la elección en localStorage y sincroniza cambios entre pestañas. Sin elección previa sigue el sistema y sus cambios; con almacenamiento bloqueado conserva la elección durante la visita.

`public/theme-init.js` aplica el tema antes de pintar la página. `ThemeProvider` controla el estado de React. Clerk recibe los colores mediante su API pública de apariencia y Sonner recibe el tema seleccionado; no se ocultan elementos internos de autenticación mediante clases generadas. Las fotografías de productos mantienen sus colores originales.

### Ajustes posteriores de contraste y marca

Se tomó la paleta del panel de APIGeneral como referencia de lectura, sin modificar el backend. El anuncio mantiene fondo oscuro fijo y texto lima; los contadores usan números oscuros sobre lima o violeta. Las direcciones guardadas tienen tarjetas rectas, sombras sólidas, campos organizados y un estado predeterminado lima con texto oscuro. El botón de remover utiliza una superficie oscura y texto naranja claro.

Se restauró el PNG original de Techsells en cabecera y pie. El archivo permanece intacto; CSS adapta su contraste al fondo oscuro.

Las parejas de colores declaradas para anuncio, contadores, dirección predeterminada, botón de remover y campos alcanzan contrastes entre 10,02:1 y 16,28:1 en el tema oscuro. Esta medición corresponde al CSS, no a una captura de navegador. Se añadieron regresiones de selección, eliminación y bloqueo de operaciones repetidas en direcciones guardadas.

## Verificación

- `npm run check`: formato, ESLint sin advertencias, tipos de pruebas, **76 pruebas en 15 archivos** y compilación de producción.
- Nuevas regresiones: respuesta perdida al pagar, contexto de compra, caducidad, recarga, aislamiento de sesión, inventario bajo, límites de texto y cantidades, navegación, accesibilidad del menú y modo oscuro.
- Comprobaciones HTTP locales: cinco rutas de la SPA sirven correctamente, el script de tema responde como JavaScript y el preflight de checkout permite `Idempotency-Key` junto a Authorization y Content-Type.
- No se realizaron compras, no se crearon fixtures ni se aplicaron migraciones. No se cambiaron archivos o configuración del backend.

El navegador y el canal nativo de control no estuvieron disponibles. Las pruebas de componentes usan jsdom; no sustituyen una inspección visual en Chrome ni un nuevo recorrido autenticado con Stripe. El usuario revisó la tienda local y solicitó corregir anuncio, direcciones, contadores y logo; esos ajustes se implementaron y después autorizó subir los cambios. La inspección automatizada en navegador sigue pendiente.

## Para revisar

El servidor local existente responde en http://localhost:5173. Revisar portada, catálogo, detalle y carrito en escritorio y móvil; alternar claro/oscuro y comprobar acceso, formularios y administración con las cuentas existentes.

Las rutas y contratos comerciales se conservaron. Esta entrega se publica en la rama `master` de `JOSY12/Ts-React-Sena`, sin cambios al repositorio del backend. La integración de Vercel puede desplegar automáticamente el commit recibido; consultar su estado para confirmar qué versión sirve el dominio público.

Verificación de entrega repetida: `npm run check` correcto, `npm audit --audit-level=high` sin vulnerabilidades y `git diff --check` sin errores.
