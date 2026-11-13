import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { webcrypto } from 'node:crypto'

Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto })

const items = new Map<string, string>()
const storage: Storage = {
  getItem: (key) => items.get(key) ?? null,
  setItem: (key, value) => {
    items.set(key, String(value))
  },
  removeItem: (key) => {
    items.delete(key)
  },
  clear: () => items.clear(),
  key: (index) => [...items.keys()][index] ?? null,
  get length() {
    return items.size
  }
}
// Node 26 exposes its own optional Storage global; isolate browser storage per test worker.
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: storage
})
afterEach(cleanup)
vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn(() => 1),
    dismiss: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn()
  }
}))

HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open')
}
