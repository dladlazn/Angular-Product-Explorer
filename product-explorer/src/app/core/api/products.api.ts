import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { API_SIMULATION, APP_STORAGE_KEYS } from '../../shared/constants/app.constants';
import { Product } from '../../features/catalog/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsApi {
  private readonly products: readonly Product[] = [
    {
      id: 'p-1001',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with USB-C charging.',
      category: 'Accessories',
      price: 49.99,
      rating: 4.6,
      inStock: true
    },
    {
      id: 'p-1002',
      name: 'Keyboard',
      description: 'Compact keyboard with tactile switches and hot-swap support.',
      category: 'Accessories',
      price: 109.0,
      rating: 4.8,
      inStock: true
    },
    {
      id: 'p-1003',
      name: 'Headphones',
      description: 'Over-ear wireless headphones with active noise cancellation.',
      category: 'Audio',
      price: 179.99,
      rating: 4.4,
      inStock: false
    },
    {
      id: 'p-1004',
      name: 'Laptop',
      description: 'Lightweight laptop for productivity and travel.',
      category: 'Computers',
      price: 999.0,
      rating: 4.3,
      inStock: true
    },
    {
      id: 'p-1005',
      name: 'Mini PC',
      description: 'Small form factor desktop for office workloads.',
      category: 'Computers',
      price: 649.0,
      rating: 4.1,
      inStock: true
    },
    {
      id: 'p-1006',
      name: 'Light Monitor',
      description: '27-inch UHD display with accurate color reproduction.',
      category: 'Displays',
      price: 389.99,
      rating: 4.7,
      inStock: true
    },
    {
      id: 'p-1007',
      name: 'Router A',
      description: 'Dual-band mesh router with easy app setup.',
      category: 'Networking',
      price: 129.5,
      rating: 4.2,
      inStock: false
    },
    {
      id: 'p-1008',
      name: 'Audio Interface',
      description: '2-input audio interface for creators and streamers.',
      category: 'Audio',
      price: 159.0,
      rating: 4.5,
      inStock: true
    },
    {
      id: 'p-1009',
      name: 'Dock',
      description: 'Universal laptop dock with dual display support.',
      category: 'Accessories',
      price: 89.99,
      rating: 4.2,
      inStock: true
    },
    {
      id: 'p-1010',
      name: 'X Monitor',
      description: '24-inch full HD monitor for daily office workflows.',
      category: 'Displays',
      price: 249.0,
      rating: 4.0,
      inStock: true
    },
    {
      id: 'p-1011',
      name: 'Router B',
      description: 'High-speed router designed for busy home offices.',
      category: 'Networking',
      price: 219.5,
      rating: 4.3,
      inStock: false
    },
    {
      id: 'p-1012',
      name: 'Speaker',
      description: 'Portable speakerphone with clear voice pickup.',
      category: 'Audio',
      price: 139.0,
      rating: 4.4,
      inStock: true
    }
  ];

  public getProducts(forceError = false): Observable<readonly Product[]> {
    const shouldFail = forceError || localStorage.getItem(APP_STORAGE_KEYS.forceCatalogError) === 'true';
    const latency = this.getLatency();

    if (shouldFail) {
      return throwError(() => new Error('Unable to load products right now.')).pipe(
        delay(latency)
      );
    }

    return of(this.products).pipe(delay(latency));
  }

  private getLatency(): number {
    const { minLatencyMs, maxLatencyMs } = API_SIMULATION;
    return Math.floor(Math.random() * (maxLatencyMs - minLatencyMs + 1)) + minLatencyMs;
  }
}
