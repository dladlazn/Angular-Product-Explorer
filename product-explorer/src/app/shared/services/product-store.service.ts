import { Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ProductsApi } from '../../core/api/products.api';
import { Product } from '../../features/catalog/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductStoreService {
  private readonly productsState = signal<readonly Product[]>([]);
  private readonly loadingState = signal<boolean>(false);
  private readonly errorState = signal<string | null>(null);

  public readonly products = this.productsState.asReadonly();
  public readonly loading = this.loadingState.asReadonly();
  public readonly error = this.errorState.asReadonly();

  public constructor(private readonly productsApi: ProductsApi) {}

  public ensureLoaded(): void {
    if (this.productsState().length > 0 || this.loadingState()) {
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
          this.productsState.set(products);
          this.errorState.set(null);
        },
        error: (error: unknown) => {
          const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
          this.errorState.set(message);
        }
      });
  }

  public getProductById(productId: string | null): Product | null {
    if (!productId) {
      return null;
    }

    return this.productsState().find((product) => product.id === productId) ?? null;
  }
}
