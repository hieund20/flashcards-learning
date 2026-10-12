import {
  Component,
  computed,
  effect,
  inject,
  input
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlashCard } from '../../../../core/models/flash-card';
import { LearningMode } from '../../../../core/models/learning-mode';
import { RetentionService } from '../../../../core/services/retention.service';

@Component({
  selector: 'app-flashcard',
  imports: [MatCardModule, MatInputModule, MatIcon, MatTooltipModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss',
})
export class FlashcardComponent {
  card = input.required<FlashCard>();
  private retentionService = inject(RetentionService);

  learningMode = input.required<LearningMode>();

  isFlipped = false;

  protected readonly isInReview = computed(() =>
    this.retentionService.isInReview(this.card().id, this.learningMode()),
  );

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

  protected addToReview(): void {
    if (this.isInReview()) {
      return;
    }

    this.retentionService.getRetention(this.card().id, this.learningMode());
  }
}
