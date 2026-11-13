import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '../src/Componentes/Modal'
import { Direcciones_usuario } from '../src/Zustand/Direcciones_usuario'

describe('direcciones', () => {
  it('rechaza teléfono excesivo y campos de solo espacios antes de llamar a la API', async () => {
    const save = vi
      .spyOn(Direcciones_usuario.getState(), 'agregar_direciones')
      .mockResolvedValue(true)
    render(<Modal />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Agregar dirección' }))
    for (const [label, value] of [
      ['Nombre de comprador', '   '],
      ['Direccion', 'Calle de prueba'],
      ['Telefono de comprador', '1'.repeat(41)],
      ['Codigo Postal', '12345'],
      ['Ciudad', 'Ciudad de prueba']
    ]) {
      fireEvent.change(screen.getByLabelText(label), { target: { value } })
    }
    await user.click(screen.getByRole('button', { name: 'Guardar direccion' }))
    await screen.findByText('Usa un máximo de 40 caracteres.')
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy()
    expect(save).not.toHaveBeenCalled()
  })
  it('un fallo mantiene abierto el diálogo y conserva los datos para reintentar', async () => {
    const save = vi
      .spyOn(Direcciones_usuario.getState(), 'agregar_direciones')
      .mockResolvedValue(false)
    render(<Modal />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Agregar dirección' }))
    await user.type(screen.getByLabelText('Nombre de comprador'), 'Persona de prueba')
    await user.type(screen.getByLabelText('Direccion'), 'Calle de prueba 123')
    await user.type(screen.getByLabelText('Telefono de comprador'), '0300123456')
    await user.type(screen.getByLabelText('Codigo Postal'), '00123')
    await user.type(screen.getByLabelText('Ciudad'), 'Medellín')
    await user.click(screen.getByRole('button', { name: 'Guardar direccion' }))
    await waitFor(() => expect(save).toHaveBeenCalledTimes(1))
    expect(screen.getByRole('dialog', { name: 'Nueva dirección' })).toBeTruthy()
    expect(
      (screen.getByLabelText('Telefono de comprador') as HTMLInputElement).value
    ).toBe('0300123456')
    expect((screen.getByLabelText('Codigo Postal') as HTMLInputElement).value).toBe(
      '00123'
    )
  })
})
