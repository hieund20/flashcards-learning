import { Component, inject, OnInit } from '@angular/core';
import { FlashCard } from '../../../../core/models/flash-card';
import { FlashCardService } from '../../../../core/services/flash-card.service';
import { RetentionService } from '../../../../core/services/retention.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-review',
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  private readonly flashCardService = inject(FlashCardService);
  private readonly retentionService = inject(RetentionService);

  protected reviewCards: FlashCard[] = [];

  protected currentIndex = 0;
  protected revealed = false;
  protected reviewCompleted = false;

  ngOnInit(): void {
    const dueIds = new Set(this.retentionService.getDueFlashCardIds());

    this.flashCardService.getAll().subscribe((cards) => {
      this.reviewCards = cards.filter((card) => dueIds.has(card.id));
    });
  }

  protected get currentCard(): FlashCard | undefined {
    return this.reviewCards[this.currentIndex];
  }

  protected reveal(): void {
    this.revealed = true;
  }

  protected review(correct: boolean): void {
    if (!this.currentCard) {
      return;
    }

    this.retentionService.review(this.currentCard.id, correct);

    this.nextCard();
  }

  protected nextCard(): void {
    this.currentIndex++;

    this.revealed = false;

    if (this.currentIndex >= this.reviewCards.length) {
      this.reviewCompleted = true;
    }
  }

  protected get totalCards(): number {
    return this.reviewCards.length;
  }

  protected get currentCardNumber(): number {
    return this.currentIndex + 1;
  }
}
