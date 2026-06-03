import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogFacade } from '../../services/catalog.facade';
import { ProductCategory, ProductSort } from '../../models/product.model';

@Component({
  selector: 'app-browse-products',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './browse-products.component.html',
  styleUrl: './browse-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseProductsComponent {
  protected readonly visibleProducts = computed(() => this.state.visibleProducts());
  protected readonly filters = computed(() => this.state.filters());

  public constructor(protected readonly state: CatalogFacade) {
    this.state.ensureLoaded();
  }

  protected retry(): void {
    this.state.loadProducts();
  }

  protected onQueryInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.state.setQuery(input.value);
  }

  protected onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.state.setCategory(select.value as ProductCategory | 'all');
  }

  protected onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.state.setSort(select.value as ProductSort);
  }

  protected onInStockOnlyChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.state.setInStockOnly(input.checked);
  }
}
