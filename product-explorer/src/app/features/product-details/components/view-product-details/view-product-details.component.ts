import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProductStoreService } from '../../../../shared/services/product-store.service';
import { FavoritesService } from '../../../../core/services/favorites.service';

@Component({
  selector: 'app-view-product-details',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './view-product-details.component.html',
  styleUrl: './view-product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly favoritesService = inject(FavoritesService);

  protected readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null }
  );

  protected readonly product = computed(() => this.productStore.getProductById(this.productId()));
  protected readonly loading = computed(() => this.productStore.loading());
  protected readonly error = computed(() => this.productStore.error());
  protected readonly isPinned = computed(() => {
    const current = this.product();
    return current ? this.favoritesService.isFavorite(current.id) : false;
  });

  public constructor(private readonly productStore: ProductStoreService) {
    this.productStore.ensureLoaded();
  }

  protected pinCurrentProduct(): void {
    const current = this.product();

    if (!current || this.isPinned()) {
      return;
    }

    this.favoritesService.add(current.id);
  }
}
