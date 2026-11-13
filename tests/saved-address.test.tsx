import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Direccion from '../src/Componentes/Direccion'
import { Direcciones_usuario } from '../src/Zustand/Direcciones_usuario'

const address = {
  id: 'address-1',
  nombre_comprador: 'Persona de prueba',
  ciudad: 'Ciudad de prueba',
  direccion: 'Calle de prueba 123',
  codigo_postal: '00123',
  telefono: '0300123456',
  nota: 'Entregar en portería',
  predeterminada: false
}
beforeEach(() => Direcciones_usuario.setState({ busy: false }))
describe('direcciones guardadas después del rediseño', () => {
  it('conserva los datos y envía el ID correcto al elegir y remover', async () => {
    const choose = vi
      .spyOn(Direcciones_usuario.getState(), 'cambiar_predeterminado')
      .mockResolvedValue(true)
    const remove = vi
      .spyOn(Direcciones_usuario.getState(), 'quitar')
      .mockResolvedValue(true)
    render(<Direccion {...address} />)
    expect(
      screen.getByRole('article', { name: 'Dirección de Persona de prueba' })
    ).toBeTruthy()
    expect(screen.getByText('00123')).toBeTruthy()
    expect(screen.getByText('Entregar en portería')).toBeTruthy()
    const user = userEvent.setup()
    await user.click(
      screen.getByRole('button', { name: 'Guardar como predeterminada' })
    )
    expect(choose).toHaveBeenCalledWith('address-1')
    await user.click(screen.getByRole('button', { name: 'Remover dirección' }))
    expect(remove).toHaveBeenCalledWith('address-1')
  })
  it('identifica la dirección predeterminada sin ofrecer volver a seleccionarla', () => {
    render(<Direccion {...address} predeterminada />)
    expect(screen.getByText('Dirección predeterminada de envíos')).toBeTruthy()
    expect(
      screen.queryByRole('button', { name: 'Guardar como predeterminada' })
    ).toBeNull()
  })
  it('impide solicitudes repetidas mientras la operación está en curso', async () => {
    Direcciones_usuario.setState({ busy: true })
    const remove = vi
      .spyOn(Direcciones_usuario.getState(), 'quitar')
      .mockResolvedValue(true)
    render(<Direccion {...address} />)
    const button = screen.getByRole('button', {
      name: 'Remover dirección'
    }) as HTMLButtonElement
    expect(button.disabled).toBe(true)
    await userEvent.setup().click(button)
    expect(remove).not.toHaveBeenCalled()
  })
})
