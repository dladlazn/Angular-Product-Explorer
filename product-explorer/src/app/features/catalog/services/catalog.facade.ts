import { Injectable, computed, signal } from '@angular/core';
import { CatalogFilters, Product, ProductCategory, ProductSort } from '../models/product.model';
import { ProductStoreService } from '../../../shared/services/product-store.service';

const DEFAULT_FILTERS: CatalogFilters = {
  query: '',
  category: 'all',
  sort: 'relevance',
  showInStockOnly: false
};

@Injectable({ providedIn: 'root' })
export class CatalogFacade {
  private readonly filtersState = signal<CatalogFilters>(DEFAULT_FILTERS);
  public readonly filters = this.filtersState.asReadonly();
  public readonly allProducts = computed(() => this.productStore.products());
  public readonly loading = computed(() => this.productStore.loading());
  public readonly error = computed(() => this.productStore.error());

  public readonly categories = computed<readonly ProductCategory[]>(() => {
    const all = this.productStore.products();
    return Array.from(new Set(all.map((product) => product.category))).sort();
  });

  public readonly visibleProducts = computed<readonly Product[]>(() => {
    const products = this.productStore.products();
    const filters = this.filtersState();
    const query = filters.query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      if (filters.showInStockOnly && !product.inStock) {
        return false;
      }

      if (!query) {
        return true;
      }

      const name = product.name.toLowerCase();
      return name.startsWith(query);
    });

    return this.sortProducts(filtered, filters.sort);
  });

  public constructor(private readonly productStore: ProductStoreService) {}

  public ensureLoaded(): void {
    this.productStore.ensureLoaded();
  }

  public loadProducts(forceError = false): void {
    this.productStore.loadProducts(forceError);
  }

  public setQuery(query: string): void {
    this.patchFilters({ query });
  }

  public setCategory(category: ProductCategory | 'all'): void {
    this.patchFilters({ category });
  }

  public setSort(sort: ProductSort): void {
    this.patchFilters({ sort });
  }

  public setInStockOnly(showInStockOnly: boolean): void {
    this.patchFilters({ showInStockOnly });
  }

  public getProductById(productId: string | null): Product | null {
    return this.productStore.getProductById(productId);
  }

  private patchFilters(partial: Partial<CatalogFilters>): void {
    this.filtersState.update((current) => ({ ...current, ...partial }));
  }

  private sortProducts(products: readonly Product[], sort: ProductSort): readonly Product[] {
    if (sort === 'relevance') {
      return products;
    }

    const next = [...products];

    switch (sort) {
      case 'name-asc':
        return next.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-asc':
        return next.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return next.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return next.sort((a, b) => b.rating - a.rating);
      default:
        return next;
    }
  }
}
