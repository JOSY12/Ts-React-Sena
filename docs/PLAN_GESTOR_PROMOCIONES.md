# Plan futuro: gestor de promociones de Techsells

Estado: propuesta, sin implementación ni autorización de cambios al backend.

Este documento permite retomar la idea si se decide desarrollarla. No añade tablas, endpoints, credenciales, componentes ni cambios de precios. El backend debe permanecer intacto hasta recibir una instrucción nueva y explícita del usuario.

## 1. Objetivo y situación actual

Permitir que un administrador cree, edite, previsualice, programe y desactive promociones propias de la tienda, sin editar código ni desplegar por cada cambio de contenido.

Actualmente existen dos bloques estáticos:

- Franja superior: `src/Componentes/Navbar.tsx`, clase `announcement`.
- Bloque promocional de portada: `src/Componentes/Landing_page.tsx`, clase `upgrade-banner`.

No existe un gestor, almacenamiento de campañas ni una API de promociones. Los enlaces actuales funcionan, pero el contenido se modifica en el código.

La propuesta reutiliza React, Zustand, el cliente HTTP, los formularios y componentes accesibles del frontend; Express, PostgreSQL y los permisos actuales de APIGeneral; y el proveedor de imágenes que ya utiliza la tienda. No requiere migrar de framework ni incorporar otro CMS para la primera versión.

## 2. Dos alternativas

| Alternativa | Cambios necesarios | Cómo se actualiza una promoción |
| --- | --- | --- |
| Configuración estática | Solo frontend: centralizar textos, imágenes y destinos en un archivo | Editar archivo, revisar y publicar otra versión |
| Gestor administrativo, recomendado | API, persistencia y panel en frontend | Guardar desde administración; la tienda consulta el contenido publicado |

La alternativa estática permite organizar el contenido, pero no satisface el objetivo de administrarlo desde la web. Un estado de React o localStorage tampoco sería almacenamiento compartido entre visitantes.

## 3. Alcance de la primera versión

Incluir:

- Ubicaciones `announcement` y `home_banner`.
- Texto, llamada a la acción y destino dentro de la tienda.
- Imagen de escritorio y, opcionalmente, imagen móvil para el banner.
- Activar/desactivar, fecha de inicio, fecha de fin y prioridad.
- Listado administrativo con estados, edición y vista previa clara/oscura y móvil/escritorio.
- Archivado reversible para retirar campañas sin perder sus datos.
- Lectura pública de las promociones vigentes, sin exigir sesión al visitante.

Excluir de esta versión:

- Google AdSense u otras redes externas.
- Cupones, descuentos automáticos, precios tachados calculados y cambios de impuestos, stock o checkout.
- Personalización por usuario, seguimiento publicitario, pruebas A/B y carruseles.
- Editor HTML, scripts de terceros y enlaces externos libres.
- Borrado definitivo automático de campañas o imágenes.

Una promoción es contenido comercial, no una regla de precio. Mostrar «20 % de descuento» no debe cambiar el importe cobrado. Si se quieren descuentos reales, requieren un proyecto separado con validación de precios y pagos en el servidor.

## 4. Reparto entre las dos sesiones

| Responsable futuro | Entrega |
| --- | --- |
| Sesión de backend, después de autorización | Modelo y migración, validación, permisos, API pública/administrativa, subida de imágenes y pruebas de integración |
| Esta sesión de frontend | Servicios tipados, panel, formularios, previsualización y componentes públicos; pruebas de contratos y regresiones |
| Ambas sesiones | Acordar contrato, límites, errores, calendario y despliegue antes de implementar |
| Usuario | Confirmar alcance y aprobar la futura ampliación del backend y su publicación |

El frontend puede avanzar con respuestas simuladas mientras se prepara la API. Esa simulación sirve para desarrollar y probar; no debe presentarse como persistencia real ni activarse por accidente en producción.

## 5. Modelo de datos propuesto

Nueva entidad lógica `sena.promociones`. El diseño físico y la migración se revisarán en el backend; aquí no se incluye SQL ejecutable.

| Campo | Uso y regla propuesta |
| --- | --- |
| `id` | UUID generado por el servidor |
| `nombre_interno` | Identificar la campaña en administración; obligatorio, máximo 100 caracteres |
| `ubicacion` | `announcement` o `home_banner` |
| `titulo` | Texto público obligatorio; hasta 80 caracteres, con máximo 60 en la franja |
| `descripcion` | Opcional, hasta 240 caracteres; solo banner |
| `cta_texto` | Opcional, hasta 40 caracteres; obligatorio si hay destino |
| `destino` | Acción estructurada: sin enlace, catálogo, producto, categoría, contacto o registro |
| `imagen_escritorio` | Referencia de imagen; requerida para banner, ausente en franja |
| `imagen_movil` | Opcional; si falta se utiliza la de escritorio |
| `imagen_alt` | Texto alternativo cuando la imagen aporte información distinta al texto visible |
| `activa` | Booleano; las campañas nuevas se guardan desactivadas |
| `inicio` / `fin` | Instantes UTC opcionales; si ambos existen, fin debe ser posterior al inicio |
| `prioridad` | Entero de 0 a 100; mayor valor aparece primero |
| `version` | Entero para detectar ediciones simultáneas |
| `created_at` / `updated_at` | Fechas asignadas por el servidor |
| `created_by` / `updated_by` | Actor administrativo; tratar explícitamente qué ocurre al eliminar su cuenta |
| `archived_at` | Fecha opcional de archivado; una campaña archivada no aparece públicamente |

La referencia de imagen necesita al menos `url` HTTPS, `public_id`, ancho y alto. Ningún identificador de autor ni nombre interno debe incluirse en la respuesta pública.

Estados administrativos derivados, sin guardar valores que puedan quedar desactualizados: desactivada, programada, visible, finalizada y archivada.

## 6. Reglas de publicación y calendario

La API determina la vigencia con la hora del servidor/base de datos:

```text
activa = true
y archived_at es nulo
y (inicio es nulo o inicio <= ahora)
y (fin es nulo o ahora < fin)
```

- El inicio es inclusivo y el fin exclusivo.
- El formulario muestra la zona horaria elegida, inicialmente `America/Bogota`, y envía instantes ISO 8601 con zona. No enviar fechas locales ambiguas.
- No hace falta un cron para marcar campañas como vencidas: la consulta calcula qué corresponde mostrar.
- Si coinciden varias campañas, ordenar por prioridad descendente, fecha de creación descendente e ID como desempate estable.
- Mostrar como máximo una promoción por ubicación en el MVP. El panel debe advertir cuando una campaña activa pierde la posición por prioridad.
- Al terminar una campaña, puede aparecer la siguiente que cumpla las reglas.
- En el MVP, responder la lectura pública con `Cache-Control: no-store` y compartir solamente una caché de lectura de hasta 30 segundos dentro del frontend. Devolver el próximo cambio de calendario; un límite cercano reduce ese plazo. No sumar 30 segundos de CDN y otros 30 de caché local.
- El frontend debe revalidar al volver a la pestaña y mientras permanezca abierta, tomando como referencia las fechas del servidor. No basta con consultar una única vez al cargar.
- Si vence el plazo conocido y no se puede revalidar, retirar el contenido de campaña y usar el fallback. No mantener una oferta vencida indefinidamente por un fallo de red. Una caché de servidor/CDN sería una optimización posterior con un presupuesto de frescura conjunto.
- Para evitar que «guardar» publique cambios accidentalmente, en el MVP una campaña activa debe desactivarse antes de editar su contenido. La API también debe exigirlo; la interfaz explica que la campaña se retira mientras se edita. Una futura edición con revisiones de borrador puede eliminar esa interrupción.
- Archivar desactiva la campaña. Restaurarla la devuelve desactivada y requiere una nueva activación explícita.

## 7. Contrato propuesto de la API

Las rutas siguientes son una propuesta para acordar, no endpoints existentes. El cliente ya usa una base que incluye `/sena`; por tanto el frontend consumiría, por ejemplo, `/pu/promociones`.

| Método y ruta completa | Acceso | Resultado |
| --- | --- | --- |
| `GET /sena/pu/promociones` | Público | Promociones seleccionadas y vigentes de ambas ubicaciones |
| `GET /sena/p/promociones` | Administrador activo | Listado paginado, incluidos estados no públicos |
| `GET /sena/p/promociones/:id` | Administrador activo | Datos completos para editar y previsualizar |
| `POST /sena/p/promociones` | Administrador activo | Crea campaña desactivada; devuelve 201 |
| `PUT /sena/p/promociones/:id` | Administrador activo | Guarda el contenido, calendario y prioridad con control de versión |
| `PATCH /sena/p/promociones/:id/estado` | Administrador activo | Activa, desactiva, archiva o restaura con control de versión |
| `POST /sena/p/promociones/imagenes/firma` | Administrador activo | Autoriza una subida restringida; no devuelve secretos del proveedor |

En los routers se deben ordenar las rutas fijas y dinámicas para que sus patrones no colisionen. No alterar los endpoints existentes de productos, usuarios o Stripe.

Ejemplo de respuesta pública, solo ilustrativo:

```json
{
  "promociones": [
    {
      "id": "22222222-2222-4222-8222-222222222222",
      "ubicacion": "announcement",
      "titulo": "Explora nuestra selección de accesorios",
      "descripcion": null,
      "cta_texto": "Ver accesorios",
      "href": "/productos?Categorias=Accesorios",
      "imagen_escritorio": null,
      "imagen_movil": null,
      "imagen_alt": ""
    }
  ],
  "server_time": "2026-12-01T15:00:00Z",
  "next_change_at": "2026-12-02T05:00:00Z"
}
```

Sin campañas, responder 200 con `promociones: []`, `server_time` y `next_change_at` nulo si no hay un cambio conocido. No usar un error para representar ausencia de contenido.

Las respuestas administrativas pueden conservar `{ promociones, totalPaginas, Pagina }` para el listado y `{ promocion }` para el detalle. Acordar esa forma antes de construir los adaptadores.

Errores previstos:

- 400: campos o calendario inválidos, destino no publicable o imagen no válida.
- 401: no hay sesión válida.
- 403: comprador, administrador suspendido o perfil sin permisos suficientes.
- 404: campaña inexistente.
- 409: versión desactualizada; conservar el borrador y ofrecer recargar/comparar, sin sobrescribir silenciosamente.
- 409: intento de editar contenido de una campaña aún activa; distinguirlo del conflicto de versión con un mensaje claro.
- 429: límite de solicitudes o subidas.
- 5xx: error del servicio; no indicar éxito ni perder el formulario.

Mantener el formato de error de APIGeneral, `{ error: string }`, y sus códigos HTTP. No devolver trazas, credenciales ni detalles internos de conexión.

## 8. Permisos, destinos e imágenes

### Permisos

- Aplicar `requireSignedIn`, `requireActiveUser` y `requireAdmin` en todas las operaciones administrativas, incluida la autorización de subida.
- La API actual consulta los permisos y el estado suspendido en PostgreSQL. Mantener esa autorización; ocultar un botón en React o leer metadata en el cliente no es suficiente.
- El acceso público solo devuelve contenido elegible y una lista explícita de campos públicos. No exponer borradores mediante parámetros como `preview=true`.
- La previsualización de borradores debe requerir la misma autorización administrativa que editar.
- La tabla y los medios deben respetar la política de acceso del proyecto: no permitir escrituras anónimas directas desde el navegador.

### Destinos y contenido

No aceptar HTML ni scripts. Renderizar texto con React, sin `dangerouslySetInnerHTML`.

Preferir acciones estructuradas a URLs libres. Para producto se guarda su ID; para categoría, su ID, y el servidor resuelve el nombre utilizado por el filtro actual `Categorias`. Así, renombrar una categoría no deja una URL antigua guardada en la campaña.

El servidor genera un `href` relativo válido; nunca `javascript:`, `data:`, `//otro-dominio` ni direcciones externas arbitrarias. Validar que los productos de destino sean públicos. Si el destino deja de ser válido después, omitir esa promoción de la selección y advertirlo al administrador, en lugar de enlazar a un recurso privado o eliminado.

### Imágenes

El frontend actual sube imágenes con un preset unsigned y `auto/upload` en `src/features/catalogo/images.ts`. No copiar ese mecanismo para promociones suponiendo que el rol del frontend protege el proveedor.

Para el gestor propuesto:

- Reutilizar el proveedor y la experiencia de subida, pero autorizar la carga desde el backend para administradores y restringirla a recursos de imagen y una carpeta de promociones.
- Limitar en proveedor/backend, no solo en React, formato, tamaño y permisos de los parámetros firmados.
- Propuesta inicial: JPEG, PNG o WebP; hasta 5 MB por imagen; sin SVG ni animaciones. Confirmar límites con el diseño antes de implementar.
- Recomendar una composición aproximada 3:1 en escritorio y 4:3 en móvil. Previsualizar el recorte; no rechazar imágenes solo por una recomendación de composición sin acordar dimensiones mínimas.
- Mantener el texto principal y CTA en HTML, evitando texto imprescindible incrustado únicamente en la foto.
- No permitir que un `public_id` arbitrario reemplace recursos del catálogo. Validar propiedad y carpeta del recurso antes de asociarlo a una campaña.
- Subir una imagen no activa la campaña. Guardar solo después de validar y mantener la imagen anterior si falla el reemplazo.
- Archivar una campaña no elimina sus archivos del proveedor. Definir limpieza de huérfanos como tarea posterior y separada, con comprobación de referencias.

## 9. Implementación del frontend

Organización orientativa:

```text
src/features/promociones/
  api.ts
  types.ts
  usePromociones.ts
  PromotionAnnouncement.tsx
  PromotionBanner.tsx
  admin/
    PromocionesPage.tsx
    PromocionForm.tsx
    PromocionPreview.tsx
```

Integraciones previstas:

- Añadir `/u/v/admin/promociones` y su enlace en `AdminNavigation.tsx`, tanto en navegación móvil como de escritorio.
- Aplicar el mismo guard administrativo de los loaders y la misma limpieza de datos administrativos ante cambio de sesión.
- Usar el cliente HTTP existente, errores de la API, formularios y diálogos compartidos. Los guardados fallidos conservan texto, fechas e imágenes.
- Compartir la lectura pública entre cabecera y portada para evitar peticiones duplicadas. Cancelar/descartar respuestas obsoletas y mantener las páginas independientes de esta carga.
- La cabecera usa `PromotionAnnouncement`; la portada incorpora `PromotionBanner` en una ubicación acordada. No sustituir el logo ni el catálogo, ni convertir productos normales en campañas.
- Sin promociones, conservar un aviso institucional neutro en cabecera y omitir el espacio de campaña en portada. Ante error de red, usar ese mismo comportamiento sin bloquear tienda, login o carrito.
- Una imagen fallida no debe ocultar el texto y CTA válidos. Reservar sus dimensiones para reducir movimientos de contenido.
- Preview y componente público deben compartir presentación para evitar que el panel prometa un resultado distinto.
- Mantener el estilo neobrutalista, claro/oscuro, el logo original, foco visible y contraste legible. Sin reproducción automática ni temporizadores invasivos.
- Probar navegación por teclado, texto largo, imágenes ausentes, tamaños móviles y enlaces con nombres accesibles.

La vista previa es una simulación administrativa. Debe permitir elegir fecha/hora para revisar campañas futuras sin modificar la hora del sistema ni exponerlas públicamente.

## 10. Fases y criterios de salida

### Fase 0: cerrar decisiones

Confirmar las dos ubicaciones, límites de texto e imagen, destinos permitidos, zona horaria, prioridad y comportamiento sin campañas. Acordar el DTO y ejemplos de error entre las sesiones. Autorizar por separado la futura ampliación del backend.

**Salida:** contrato aprobado y casos de aceptación definidos; ningún cambio de producción.

### Fase 1: API y persistencia

La sesión de backend diseña una migración aditiva y reversible, las validaciones, los permisos, la selección pública y el flujo de imágenes. Preparar fixtures en una base aislada, sin ejecutar scripts de limpieza sobre la base alojada.

**Salida:** pruebas de integración correctas; endpoints existentes siguen funcionando; respuestas de ejemplo disponibles para el frontend.

### Fase 2: panel administrativo

Implementar listado, formulario, estados, fechas y preview con respuestas simuladas primero y la API real después. Guardar campañas desactivadas y separar «guardar» de «activar» para evitar publicaciones accidentales.

**Salida:** un administrador puede crear y editar un borrador, subir imágenes y previsualizarlo sin mostrarlo al público; un comprador no puede hacerlo.

### Fase 3: presentación pública

Integrar las dos ubicaciones, enlaces, selección por prioridad, revalidación y fallbacks. Completar revisión visual en escritorio y móvil, claro y oscuro.

**Salida:** solo se ven campañas vigentes y elegibles, y ninguna falla impide comprar o navegar.

### Fase 4: revisión conjunta y publicación

1. Validar el flujo completo en un entorno de prueba con cuentas existentes o fixtures autorizados.
2. Preparar revisión de código y evidencia; acordar la migración y su recuperación con el responsable del backend.
3. Publicar primero la API y aplicar la migración aprobada, manteniendo todas las promociones desactivadas.
4. Comprobar permisos y lectura pública vacía.
5. Publicar el frontend y comprobar la tienda sin campañas.
6. Crear o reutilizar una campaña de prueba autorizada, revisar preview y activar la campaña acordada.
7. Confirmar el dominio público, el calendario y la posibilidad de desactivación inmediata dentro del margen de caché acordado.

**Salida:** pruebas y despliegues correctos, campaña autorizada visible y procedimiento de recuperación documentado.

### Fase 5, opcional

Historial detallado de cambios, duplicación de campañas, más ubicaciones o medición agregada de clics. No añadir seguimiento personal ni cupones al MVP por conveniencia de implementación.

## 11. Matriz mínima de pruebas

| Área | Casos necesarios |
| --- | --- |
| Permisos | Visitante y comprador no crean/editan/activan/suben; administrador activo sí; suspendido y sesión revocada no |
| Exposición | Endpoint público nunca devuelve borradores, campañas archivadas ni datos internos de autores |
| Calendario | Sin fechas, inicio futuro, inicio exacto, fin exacto, fechas inválidas, conversión UTC/Bogotá y pestaña abierta durante un cambio |
| Prioridad | Solapamiento, empate estable y paso a la siguiente campaña al vencer/desactivar la primera |
| Edición | Guardado fallido conserva borrador; doble clic no duplica envíos; conflicto de versión no pierde cambios |
| Imágenes | Tipo/tamaño prohibidos, subida no autorizada, fallo de red, referencia ajena y reemplazo fallido |
| Destinos | URL maliciosa rechazada; producto oculto/eliminado y categoría renombrada no provocan enlaces rotos |
| Resiliencia | Lista vacía, API caída, imagen rota, caché vencida y ninguna dependencia de promociones bloquea el catálogo |
| Diseño | Logo intacto, contraste de CTA, foco, texto largo y móvil en ambos temas |
| Regresión | Login, roles, categorías/filtros, favoritos, carrito, direcciones y checkout conservan sus contratos y resultados |

Ejecutar los checks del frontend y backend vigentes al implementar; las 76 pruebas actuales del frontend son la referencia de esta entrega, no un número que deba permanecer fijo. Un build correcto o mocks correctos no sustituyen la prueba conjunta API → datos → respuesta → renderizado.

## 12. Recuperación y condiciones para considerarlo terminado

Si una campaña tiene contenido erróneo, desactivarla y comprobar la respuesta pública tras vencer la caché. Si falla el módulo, el frontend conserva los fallbacks. Si hace falta revertir el frontend, los endpoints antiguos deben seguir disponibles.

No eliminar tablas o imágenes como primer paso de recuperación. Una migración de reversión solo se ejecuta después de comprobar que ninguna versión desplegada la necesita y de revisar los datos que se perderían.

La función se considera lista cuando un administrador puede publicar, programar y retirar contenido compartido para todos los visitantes; nadie sin permisos puede administrarlo; móvil y modo oscuro son legibles; y una avería del módulo no interrumpe los flujos existentes de la tienda.

Referencias locales para retomar: [contrato actual de APIGeneral](CONTRATO_APIGENERAL.md) y [rediseño y verificaciones del frontend](REDISENO_NEOBRUTALISTA.md).

Antes de comenzar, volver a revisar los dos repositorios y los proveedores configurados: este documento describe el estado conocido al redactarlo, no garantiza que rutas, límites o herramientas sigan iguales en una fecha futura.
