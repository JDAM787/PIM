import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from './login-page';

vi.mock('./auth-service', () => ({
  signInWithEmail: vi.fn().mockResolvedValue(undefined),
  signInWithGoogle: vi.fn().mockResolvedValue(undefined),
}));

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<p>Productos</p>} />
      </Routes>
    </MemoryRouter>
  );
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
}

describe('LoginPage', () => {
  beforeAll(() => {
    // jsdom no implementa ResizeObserver y el Checkbox de Radix lo usa.
    globalThis.ResizeObserver ??= class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    };
  });

  it('muestra errores si se envía vacío', () => {
    renderLogin();
    submit();
    expect(screen.getByText('Ingresa tu correo electrónico.')).toBeTruthy();
    expect(screen.getByText('Ingresa tu contraseña.')).toBeTruthy();
  });

  it('alterna la visibilidad de la contraseña', () => {
    renderLogin();
    const password = screen.getByLabelText('Contraseña');
    expect(password.getAttribute('type')).toBe('password');
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar contraseña' }));
    expect(password.getAttribute('type')).toBe('text');
  });

  it('navega a productos con datos válidos', async () => {
    renderLogin();
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'juan@pim.dev' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'secreta' },
    });
    submit();
    await waitFor(() => {
      expect(screen.getByText('Productos')).toBeTruthy();
    });
  });
});
