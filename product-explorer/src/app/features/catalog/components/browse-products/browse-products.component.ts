import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CatalogFacade } from '../../services/catalog.facade';

@Component({
  selector: 'app-browse-products',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './browse-products.component.html',
  styleUrl: './browse-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseProductsComponent {
  protected readonly visibleProducts = computed(() => this.state.visibleProducts());

  public constructor(protected readonly state: CatalogFacade) {
    this.state.ensureLoaded();
  }

  protected retry(): void {
    this.state.loadProducts();
  }
}
