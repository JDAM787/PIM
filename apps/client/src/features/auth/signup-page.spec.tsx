import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { SignupPage } from './signup-page';

vi.mock('./auth-service', () => ({
  signUpWithEmail: vi.fn().mockResolvedValue({ needsEmailConfirmation: false }),
  signInWithGoogle: vi.fn().mockResolvedValue(undefined),
}));

function renderSignup() {
  return render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<p>Productos</p>} />
      </Routes>
    </MemoryRouter>
  );
}

function fill(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));
}

describe('SignupPage', () => {
  it('muestra errores solo en los campos obligatorios', () => {
    renderSignup();
    submit();
    expect(screen.getByText('Ingresa tu nombre.')).toBeTruthy();
    expect(screen.getByText('Ingresa tu correo electrónico.')).toBeTruthy();
    expect(screen.getByText('Crea una contraseña.')).toBeTruthy();
    expect(screen.getByLabelText('Empresa').getAttribute('aria-invalid')).toBe(
      null
    );
  });

  it('entra directo a la app sin empresa y con un correo personal', async () => {
    renderSignup();
    fill('Nombre', 'Ana Pérez');
    fill('Correo electrónico', 'ana@gmail.com');
    fill('Contraseña', 'secreta123');
    submit();
    await waitFor(() => {
      expect(screen.getByText('Productos')).toBeTruthy();
    });
  });

  it('enlaza de vuelta al login', () => {
    renderSignup();
    expect(
      screen.getByRole('link', { name: 'Inicia sesión' }).getAttribute('href')
    ).toBe('/login');
  });
});
