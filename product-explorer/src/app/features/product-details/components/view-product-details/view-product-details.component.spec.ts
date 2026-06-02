import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProductStoreService } from '../../../../shared/services/product-store.service';
import { ViewProductDetailsComponent } from './view-product-details.component';

describe('ViewProductDetailsComponent', () => {
  let fixture: ComponentFixture<ViewProductDetailsComponent>;

  const mockProductStore = {
    ensureLoaded: vi.fn(),
    loading: signal(false),
    error: signal<string | null>(null),
    getProductById: (id: string | null) => {
      if (id !== 'p-1001') {
        return null;
      }

      return {
        id: 'p-1001',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with USB-C charging.',
        category: 'Accessories',
        price: 49.99,
        rating: 4.6,
        inStock: true
      };
    }
  } as unknown as ProductStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProductDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'p-1001' }))
          }
        },
        { provide: ProductStoreService, useValue: mockProductStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProductDetailsComponent);
    fixture.detectChanges();
  });

  it('requests shared products on init', () => {
    expect(mockProductStore.ensureLoaded).toHaveBeenCalled();
  });

  it('renders the selected product details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Wireless Mouse');
    expect(compiled.textContent).toContain('Ergonomic wireless mouse with USB-C charging.');
  });
});
