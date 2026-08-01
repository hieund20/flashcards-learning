import { Injectable, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly currentTheme = signal<Theme>('light');
  private readonly document = inject(DOCUMENT);
  private readonly STORAGE_KEY = 'theme';

  constructor() {
    this.loadTheme();
    effect(() => {
      const theme = this.currentTheme();
      this.document.documentElement.setAttribute('data-theme', theme);
      this.saveTheme();
    });
  }

  toggle(): void {
    this.currentTheme.update((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
    );
  }

  private loadTheme(): void {
    const theme = localStorage.getItem(this.STORAGE_KEY);

    if (theme === 'light' || theme === 'dark') {
      this.currentTheme.set(theme);
    }
  }

  private saveTheme(): void {
    localStorage.setItem(this.STORAGE_KEY, this.currentTheme());
  }
}
