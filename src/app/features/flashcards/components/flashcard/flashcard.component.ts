import {
  Component,
  input,
  output,
  effect,
  computed,
  inject,
} from '@angular/core';
import { FlashCard } from '../../../../core/models/flash-card';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { RetentionService } from '../../../../core/services/retention.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-flashcard',
  imports: [MatCardModule, MatInputModule, MatIcon, MatTooltipModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss',
})
export class FlashcardComponent {
  card = input.required<FlashCard>();
  private retentionService = inject(RetentionService);

  readonly isFavorite = input(false);
  readonly favoriteClicked = output<string>();

  protected readonly isInReview = computed(() =>
    this.retentionService.isInReview(this.card().id),
  );

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

  protected addToReview(): void {
    if (this.isInReview()) {
      return;
    }

    this.retentionService.getRetention(this.card().id);
  }
}
