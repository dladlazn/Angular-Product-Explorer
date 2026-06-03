import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { ProductStoreService } from '../../../../shared/services/product-store.service';

@Component({
  selector: 'app-view-favorites',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './view-favorites.component.html',
  styleUrl: './view-favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFavoritesComponent {
  protected readonly loading = computed(() => this.productStore.loading());
  protected readonly error = computed(() => this.productStore.error());
  protected readonly favoriteProducts = computed(() => {
    const favoriteIds = this.favoritesService.favoriteIds();
    return this.productStore.products().filter((product) => favoriteIds.has(product.id));
  });

  public constructor(
    private readonly productStore: ProductStoreService,
    private readonly favoritesService: FavoritesService
  ) {
    this.productStore.ensureLoaded();
  }

  protected removeFavorite(productId: string): void {
    this.favoritesService.remove(productId);
  }
}
