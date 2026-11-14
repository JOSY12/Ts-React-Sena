import { spawn } from 'node:child_process'
import { once } from 'node:events'
import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import os from 'node:os'

// Read-only smoke test: use a separate, temporary Chrome profile and never sign in.
const chrome =
  process.env.CHROME_PATH ||
  (process.platform === 'win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome')
if (!fs.existsSync(chrome))
  throw new Error('Configura CHROME_PATH con el ejecutable de Chrome.')
const origin = process.env.FRONTEND_URL || 'http://localhost:5173'
const tempBase = fs.realpathSync(os.tmpdir())
const profile = fs.mkdtempSync(path.join(tempBase, 'techsells-browser-'))
const server = net.createServer()
server.listen(0, '127.0.0.1')
await once(server, 'listening')
const port = server.address().port
await new Promise((resolve) => server.close(resolve))
const browser = spawn(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    'about:blank'
  ],
  { windowsHide: true, stdio: 'ignore' }
)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const responses = []
const exceptions = []
const requests = new Map()
const failedRequests = []
const pending = new Map()
let ws
let id = 0

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const request = ++id
    const timeout = setTimeout(() => {
      pending.delete(request)
      reject(new Error(`Timeout en ${method}`))
    }, 10000)
    pending.set(request, { resolve, reject, timeout })
    ws.send(JSON.stringify({ id: request, method, params }))
  })
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true })
  if (result.exceptionDetails)
    throw new Error('Falló una acción de comprobación en el navegador.')
  return result.result.value
}
async function waitFor(expression, label) {
  for (let n = 0; n < 40; n++) {
    if (
      await evaluate(
        `document.readyState !== 'loading' && !!document.body && (${expression})`
      )
    )
      return
    await delay(1000)
  }
  throw new Error(`No se completó: ${label}`)
}
async function screenshot(name) {
  const result = await send('Page.captureScreenshot', { format: 'png' })
  fs.mkdirSync('test-results', { recursive: true })
  fs.writeFileSync(path.join('test-results', name), Buffer.from(result.data, 'base64'))
}

try {
  let pages
  for (let n = 0; n < 40; n++) {
    try {
      pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
      if (pages.some((page) => page.type === 'page')) break
    } catch {
      /* Chrome may not have opened the debugging listener yet. */
    }
    await delay(500)
  }
  const page = pages?.find((page) => page.type === 'page')
  if (!page) throw new Error('Chrome no inició su puerto de pruebas.')
  ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', reject, { once: true })
  })
  ws.addEventListener('close', () => {
    for (const request of pending.values()) {
      clearTimeout(request.timeout)
      request.reject(new Error('Navegador cerrado.'))
    }
    pending.clear()
  })
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      const request = pending.get(message.id)
      clearTimeout(request.timeout)
      pending.delete(message.id)
      if (message.error) request.reject(new Error(message.error.message))
      else request.resolve(message.result)
    }
    if (message.method === 'Runtime.exceptionThrown')
      exceptions.push(message.params.exceptionDetails.exception?.className || 'Error')
    if (message.method === 'Network.requestWillBeSent')
      requests.set(message.params.requestId, message.params.request.url)
    if (message.method === 'Network.loadingFailed') {
      const url = requests.get(message.params.requestId) || ''
      failedRequests.push({
        service: /clerk|accounts\.dev/.test(url)
          ? 'Clerk'
          : url.includes('/sena/')
            ? 'API'
            : 'recurso',
        error: message.params.errorText
      })
    }
    if (message.method === 'Network.responseReceived') {
      const url = new URL(message.params.response.url)
      if (url.pathname.includes('/sena/pu/'))
        responses.push({
          path: url.pathname.replace(/\/[0-9a-f-]{36}$/i, '/:id'),
          status: message.params.response.status
        })
    }
  })
  await send('Runtime.enable')
  await send('Page.enable')
  await send('Network.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1365,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  })
  await send('Page.navigate', { url: `${origin}/productos` })
  await waitFor(
    "document.body.textContent.includes('Productos encontrados') && ![...document.querySelectorAll('[role=status]')].some(e=>e.textContent.includes('Cargando'))",
    'catálogo'
  )
  await screenshot('catalogo-escritorio.png')
  const initial = await evaluate(
    "({catalogo:document.body.textContent.includes('Productos encontrados'),error:!!document.querySelector('[role=alert]'),productos:!!document.querySelector('a[href^=\"/productos/\"]')})"
  )
  console.log('Catálogo en Chrome:', JSON.stringify(initial))
  if (initial.error) throw new Error('El catálogo muestra un error de integración.')
  await evaluate(
    "(()=>{const input=document.querySelector('[aria-label=\"Buscar producto\"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'zz_sin_resultados_revision_2026');input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[aria-label=\"Buscar productos\"]').click();return true})()"
  )
  await waitFor(
    "document.body.textContent.includes('No se encontraron productos con estos filtros.')",
    'búsqueda sin resultados'
  )
  console.log('Búsqueda sin resultados: correcta')
  await evaluate('history.back()')
  await waitFor(
    "location.search === '' && document.body.textContent.includes('Productos encontrados') && ![...document.querySelectorAll('[role=status]')].some(e=>e.textContent.includes('Cargando'))",
    'historial atrás'
  )
  console.log('Historial y filtros: correctos')
  if (initial.productos) {
    await evaluate('document.querySelector(\'a[href^="/productos/"]\').click()')
    await waitFor(
      "location.pathname.startsWith('/productos/') && [...document.querySelectorAll('section')].some(section => section.getAttribute('aria-label') === 'Detalle del producto')",
      'detalle de producto'
    )
    await screenshot('detalle-escritorio.png')
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true
    })
    await screenshot('detalle-movil.png')
    console.log('Detalle de producto y vista móvil: renderizados')
  }
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1365,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  })
  for (const route of ['/u/carrito', '/u/v/admin/usuarios']) {
    await send('Page.navigate', { url: origin + route })
    await waitFor(
      "location.pathname === '/iniciarsesion' && !!document.querySelector('.cl-signIn-root input')",
      'redireccion privada a Clerk'
    )
  }
  const unauthorizedCalls = [...requests.values()].filter((url) =>
    /\/sena\/(u|p|stripe_compras)\//.test(url)
  )
  if (unauthorizedCalls.length)
    throw new Error('Un loader anonimo consulto una ruta privada.')
  await screenshot('inicio-sesion-escritorio.png')
  console.log(
    'Guards anónimos de carrito y administración: redirigen al login sin consultar datos privados'
  )
  await send('Page.navigate', { url: origin + '/registrar' })
  await waitFor(
    "!!document.querySelector('.cl-signUp-root input')",
    'formulario de registro Clerk'
  )
  await screenshot('registro-escritorio.png')
  console.log('Formularios Clerk de login y registro: renderizados sin crear cuentas')
  console.log('Respuestas públicas:', JSON.stringify(responses))
  console.log('Excepciones JavaScript:', JSON.stringify(exceptions))
  if (exceptions.length || responses.some((response) => response.status >= 400))
    process.exitCode = 1
} catch (error) {
  console.log('Verificación de navegador:', error.message)
  if (ws?.readyState === WebSocket.OPEN) {
    console.log(
      'Estado de render:',
      JSON.stringify(
        await evaluate(
          "({rootNodes:document.querySelector('#root')?.childElementCount,navbar:document.body.textContent.includes('Techsells'),configuration:document.body.textContent.includes('Configuración pendiente')})"
        )
      )
    )
    console.log('Excepciones JavaScript:', JSON.stringify(exceptions))
    console.log('Peticiones fallidas:', JSON.stringify(failedRequests))
    console.log('Respuestas públicas:', JSON.stringify(responses))
    await screenshot('fallo-navegador.png')
  }
  process.exitCode = 1
} finally {
  if (ws?.readyState === WebSocket.OPEN) {
    try {
      await send('Browser.close')
    } catch {
      /* Closing Chrome also closes CDP. */
    }
    ws.close()
  }
  if (browser.exitCode === null)
    await Promise.race([once(browser, 'exit'), delay(2000)])
  if (browser.exitCode === null) browser.kill()
  // Never delete a path outside this invocation's explicitly created temporary profile.
  const target = path.resolve(profile)
  if (
    path.dirname(target) === path.resolve(tempBase) &&
    path.basename(target).startsWith('techsells-browser-')
  ) {
    try {
      fs.rmSync(target, {
        recursive: true,
        force: true,
        maxRetries: 3,
        retryDelay: 200
      })
    } catch {
      /* Chrome may still be releasing a profile lock. */
    }
  }
}
