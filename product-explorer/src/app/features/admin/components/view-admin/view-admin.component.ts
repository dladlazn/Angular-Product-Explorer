import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { APP_STORAGE_KEYS } from '../../../../shared/constants/app.constants';

@Component({
  selector: 'app-view-admin',
  standalone: true,
  templateUrl: './view-admin.component.html',
  styleUrl: './view-admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewAdminComponent {
  protected readonly favoriteCount = computed(() => this.favoritesService.favoriteIds().size);
  protected readonly forceCatalogErrorEnabled = signal(this.readFlag(APP_STORAGE_KEYS.forceCatalogError));

  public constructor(
    private readonly favoritesService: FavoritesService,
    private readonly router: Router
  ) {}

  protected toggleCatalogErrorSimulation(): void {
    const next = !this.forceCatalogErrorEnabled();
    localStorage.setItem(APP_STORAGE_KEYS.forceCatalogError, String(next));
    this.forceCatalogErrorEnabled.set(next);
  }

  protected clearFavorites(): void {
    this.favoritesService.clear();
  }

  protected revokeAdminAccess(): void {
    localStorage.setItem(APP_STORAGE_KEYS.isAdmin, 'false');
    this.router.navigate(['/catalog']);
  }

  private readFlag(storageKey: string): boolean {
    return localStorage.getItem(storageKey) === 'true';
  }
}
