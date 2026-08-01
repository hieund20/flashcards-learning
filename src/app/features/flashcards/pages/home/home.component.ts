import { Component, computed, inject, signal } from '@angular/core';
import { FlashCard } from '../../../../core/models/flash-card';
import { FlashCardService } from '../../../../core/services/flash-card.service';
import { FlashcardComponent } from '../../components/flashcard/flashcard.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { FavoriteService } from '../../../../core/services/favorite.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    ToolbarComponent,
    SearchBarComponent,
    FlashcardComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly flashCardService = inject(FlashCardService);
  readonly favoriteService = inject(FavoriteService);

  readonly cards = signal<FlashCard[]>([]);

  readonly currentIndex = signal(0);

  readonly filteredCards = computed(() => {
    const keyword = this.searchKeyword().trim().toLowerCase();

    if (!keyword) {
      return this.cards();
    }

    return this.cards().filter((card) =>
      card.word.toLowerCase().includes(keyword),
    );
  });

  readonly currentCard = computed(
    () => this.filteredCards()[this.currentIndex()],
  );

  //Search
  readonly searchKeyword = signal('');

  constructor() {
    this.flashCardService.getAll().subscribe((cards) => {
      this.cards.set(cards);
    });
  }

  next(): void {
    if (this.currentIndex() < this.filteredCards().length - 1) {
      this.currentIndex.update((index) => index + 1);
    }
  }

  previous(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((index) => index - 1);
    }
  }

  //search
  onSearchChanged(keyword: string): void {
    this.searchKeyword.set(keyword);
    this.currentIndex.set(0);
  }

  toggleFavorite(id: string): void {
    this.favoriteService.toggle(id);
  }
}
