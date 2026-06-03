import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { BrowseProductsComponent } from './browse-products.component';
import { ProductsApi } from '../../../../core/api/products.api';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  template: '<p>Product details</p>'
})
class TestDetailsComponent {}

describe('BrowseProductsComponent functional flow', () => {
  const testProducts: readonly Product[] = [
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
  ];

  const mockProductsApi = {
    getProducts: vi.fn(() => of(testProducts))
  } as unknown as ProductsApi;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseProductsComponent],
      providers: [
        { provide: ProductsApi, useValue: mockProductsApi },
        provideRouter([
          { path: 'products/:id', component: TestDetailsComponent },
          { path: '**', component: TestDetailsComponent }
        ])
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('filters by search and navigates to product details', async () => {
    const fixture = TestBed.createComponent(BrowseProductsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;
    searchInput.value = 'wire';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const visibleTitles = Array.from(
      fixture.nativeElement.querySelectorAll('.card h2') as NodeListOf<HTMLElement>
    ).map((item) => item.textContent?.trim());

    expect(visibleTitles).toEqual(['Wireless Mouse']);

    const viewButton = fixture.nativeElement.querySelector('.card .favorite-btn') as HTMLButtonElement;
    viewButton.click();
    await fixture.whenStable();

    expect(router.url).toBe('/products/p-1');
  });
});
