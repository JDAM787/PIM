import { listProducts } from './products-service';

describe('listProducts (mock)', () => {
  it('por defecto lista solo productos de primer nivel', async () => {
    const page = await listProducts();
    expect(page.items.length).toBeGreaterThan(0);
    expect(page.items.every((item) => item.parentId === null)).toBe(true);
  });

  it('filtra por estado y búsqueda sin distinguir mayúsculas', async () => {
    const page = await listProducts({ status: 'draft', search: 'TAZA' });
    expect(page.items.map((item) => item.label)).toEqual([
      'Taza de cerámica mate, 350 ml',
    ]);
  });

  it('devuelve las variantes de un padre', async () => {
    const page = await listProducts({ parentId: 'product-1' });
    expect(page.total).toBe(5);
    expect(page.items.every((item) => item.level === 'variant')).toBe(true);
  });

  it('pagina por cursor sin repetir elementos', async () => {
    const first = await listProducts({ level: 'variant', limit: 10 });
    expect(first.nextCursor).not.toBeNull();
    const second = await listProducts({
      level: 'variant',
      limit: 10,
      cursor: first.nextCursor ?? undefined,
    });
    const firstIds = new Set(first.items.map((item) => item.id));
    expect(second.items.some((item) => firstIds.has(item.id))).toBe(false);
  });

  it('ordena por nombre', async () => {
    const { items } = await listProducts({ sort: 'label' });
    const labels = items.map((item) => item.label);
    expect(labels).toEqual(
      [...labels].sort((a, b) => a.localeCompare(b, 'es'))
    );
  });
});
