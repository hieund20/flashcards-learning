import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlashCard } from '../../../../core/models/flash-card';
import { LearningMode } from '../../../../core/models/learning-mode';
import { FavoriteService } from '../../../../core/services/favorite.service';
import { FlashCardService } from '../../../../core/services/flash-card.service';
import { FlashcardComponent } from '../../components/flashcard/flashcard.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  imports: [
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

  readonly learningMode = signal<LearningMode>('TOEIC');

  readonly learningModes: LearningMode[] = ['TOEIC', 'IELTS'];

  constructor() {
    this.loadCards(this.learningMode());
  }

  setLearningMode(mode: LearningMode): void {
    if (this.learningMode() === mode) {
      return;
    }

    this.learningMode.set(mode);
    this.searchKeyword.set('');
    this.currentIndex.set(0);
    this.loadCards(mode);
  }

  private loadCards(mode: LearningMode): void {
    this.flashCardService.getAll(mode).subscribe({
      next: (cards) => {
        this.cards.set(cards);
        this.currentIndex.set(0);
      },
      error: (error) => {
        console.error(`Failed to load ${mode} flashcards`, error);
        this.cards.set([]);
        this.currentIndex.set(0);
      },
    });
  }

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
