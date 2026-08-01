import { Component, input, output, effect } from '@angular/core';
import { FlashCard } from '../../../../core/models/flash-card';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-flashcard',
  imports: [MatCardModule, MatInputModule, MatIcon],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss',
})
export class FlashcardComponent {
  card = input.required<FlashCard>();

  readonly isFavorite = input(false);
  readonly favoriteClicked = output<string>();

  isFlipped = false;

  constructor() {
    effect(() => {
      // Track the current card input
      this.card();

      // Reset whenever the card changes
      this.isFlipped = false;
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  toggleFavorite(): void {
    this.favoriteClicked.emit(this.card().id);
  }
}
