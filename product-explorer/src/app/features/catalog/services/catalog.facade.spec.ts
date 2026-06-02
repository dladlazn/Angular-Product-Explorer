import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CatalogFacade } from './catalog.facade';
import { ProductStoreService } from '../../../shared/services/product-store.service';
import { Product } from '../models/product.model';

describe('CatalogFacade', () => {
  const productsSignal = signal<readonly Product[]>([
    {
      id: 'p-1',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with USB-C charging.',
      category: 'Accessories',
      price: 49.99,
      rating: 4.6,
      inStock: true
    },
    {
      id: 'p-2',
      name: 'Headphones',
      description: 'Over-ear wireless headphones.',
      category: 'Audio',
      price: 179.99,
      rating: 4.4,
      inStock: false
    }
  ]);

  const mockStore = {
    products: productsSignal,
    loading: signal(false),
    error: signal<string | null>(null),
    ensureLoaded: vi.fn(),
    loadProducts: vi.fn(),
    getProductById: (id: string | null) => productsSignal().find((p) => p.id === id) ?? null
  } as unknown as ProductStoreService;

  let facade: CatalogFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ProductStoreService, useValue: mockStore }, CatalogFacade]
    });

    facade = TestBed.inject(CatalogFacade);
  });

  it('returns all products by default', () => {
    expect(facade.visibleProducts().length).toBe(2);
  });
});
