import { fireEvent, render, screen } from '@testing-library/react';

import { ProductsPage } from './products-page';

function mockViewport(desktop: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: desktop,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe('ProductsPage', () => {
  beforeAll(() => {
    // jsdom no implementa ResizeObserver y los primitivos de Radix lo usan.
    globalThis.ResizeObserver ??= class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    };
  });

  it('en escritorio muestra la tabla y despliega variantes', async () => {
    mockViewport(true);
    render(<ProductsPage />);
    expect(await screen.findByRole('table')).toBeTruthy();
    expect(screen.getByRole('complementary', { name: 'Filtros' })).toBeTruthy();

    const [firstToggle] = screen.getAllByRole('button', {
      name: 'Mostrar 5 variantes',
    });
    if (!firstToggle) throw new Error('Falta el botón de variantes');
    fireEvent.click(firstToggle);
    expect(await screen.findAllByText(/variante 1$/)).not.toHaveLength(0);
  });

  it('en móvil muestra tarjetas y oculta los filtros', async () => {
    mockViewport(false);
    render(<ProductsPage />);
    expect(await screen.findAllByRole('article')).not.toHaveLength(0);
    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
