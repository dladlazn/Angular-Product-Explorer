import { Injectable, computed, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ProductsApi } from '../../../core/api/products.api';
import { CatalogFilters, Product, ProductCategory, ProductSort } from '../models/product.model';

const DEFAULT_FILTERS: CatalogFilters = {
  query: '',
  category: 'all',
  sort: 'relevance',
  showInStockOnly: false
};

@Injectable({ providedIn: 'root' })
export class CatalogFacade {
  private readonly allProductsState = signal<readonly Product[]>([]);
  private readonly filtersState = signal<CatalogFilters>(DEFAULT_FILTERS);
  private readonly loadingState = signal<boolean>(false);
  private readonly errorState = signal<string | null>(null);

  public readonly allProducts = this.allProductsState.asReadonly();
  public readonly filters = this.filtersState.asReadonly();
  public readonly loading = this.loadingState.asReadonly();
  public readonly error = this.errorState.asReadonly();

  public readonly categories = computed<readonly ProductCategory[]>(() => {
    const all = this.allProductsState();
    return Array.from(new Set(all.map((product) => product.category))).sort();
  });

  public readonly visibleProducts = computed<readonly Product[]>(() => {
    const products = this.allProductsState();
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

      const searchable = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return searchable.includes(query);
    });

    return this.sortProducts(filtered, filters.sort);
  });

  public constructor(private readonly productsApi: ProductsApi) {}

  public ensureLoaded(): void {
    if (this.allProductsState().length > 0 || this.loadingState()) {
      return;
    }

    this.loadProducts();
  }

  public loadProducts(forceError = false): void {
    this.loadingState.set(true);
    this.errorState.set(null);

    this.productsApi
      .getProducts(forceError)
      .pipe(finalize(() => this.loadingState.set(false)))
      .subscribe({
        next: (products) => {
          this.allProductsState.set(products);
          this.errorState.set(null);
        },
        error: (error: unknown) => {
          const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
          this.errorState.set(message);
        }
      });
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
    if (!productId) {
      return null;
    }

    return this.allProductsState().find((product) => product.id === productId) ?? null;
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
