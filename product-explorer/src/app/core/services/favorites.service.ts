import { Injectable, signal } from '@angular/core';
import { APP_STORAGE_KEYS } from '../../shared/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favoriteIdsState = signal<Set<string>>(this.readFromStorage());

  public readonly favoriteIds = this.favoriteIdsState.asReadonly();

  public isFavorite(productId: string): boolean {
    return this.favoriteIdsState().has(productId);
  }

  public toggle(productId: string): void {
    this.favoriteIdsState.update((ids) => {
      const next = new Set(ids);

      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      this.saveToStorage(next);
      return next;
    });
  }

  private readFromStorage(): Set<string> {
    const raw = localStorage.getItem(APP_STORAGE_KEYS.favorites);

    if (!raw) {
      return new Set<string>();
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed.filter((value): value is string => typeof value === 'string'));
      }
    } catch {
      return new Set<string>();
    }

    return new Set<string>();
  }

  private saveToStorage(ids: ReadonlySet<string>): void {
    localStorage.setItem(APP_STORAGE_KEYS.favorites, JSON.stringify(Array.from(ids)));
  }
}
