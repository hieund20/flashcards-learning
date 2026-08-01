import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  readonly favoriteIds = signal<Set<string>>(new Set());
  private readonly STORAGE_KEY = 'favorite-ids';

  constructor() {
    this.load();
  }

  toggle(id: string): void {
    const favorites = new Set(this.favoriteIds());

    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }

    this.favoriteIds.set(favorites);
    this.save();
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds().has(id);
  }

  private save(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify([...this.favoriteIds()]),
    );
  }

  private load(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
      const favoriteIds = JSON.parse(stored) as string[];

      this.favoriteIds.set(new Set(favoriteIds));
    } catch (error) {
      console.error('Failed to load favorites.', error);
    }
  }
}
