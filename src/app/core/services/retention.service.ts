import { inject, Injectable } from '@angular/core';
import { Retention } from '../models/retention';
import { RetentionRepository } from '../repositories/retention.repository';

@Injectable({
  providedIn: 'root',
})
export class RetentionService {
  private readonly repository = inject(RetentionRepository);

  review(flashCardId: string, correct: boolean): void {
    const retention = this.getRetention(flashCardId);

    retention.reviewCount++;
    retention.lastReviewedDate = new Date();

    if (correct) {
      retention.consecutiveCorrect++;
    } else {
      retention.consecutiveCorrect = 0;
    }

    retention.nextReviewDate = this.calculateNextReviewDate(
      retention.consecutiveCorrect,
    );

    this.repository.save(retention);
  }

  getRetention(flashCardId: string): Retention {
    const retention = this.repository.getByFlashCardId(flashCardId);

    if (retention) {
      return retention;
    }

    const newRetention: Retention = {
      flashCardId,
      reviewCount: 0,
      consecutiveCorrect: 0,
      lastReviewedDate: undefined,
      nextReviewDate: new Date(),
    };

    this.repository.save(newRetention);

    return newRetention;
  }

  getDueFlashCardIds(): string[] {
    const today = new Date();

    return this.repository
      .getAll()
      .filter((retention) => new Date(retention.nextReviewDate) <= today)
      .map((retention) => retention.flashCardId);
  }

  reset(): void {
    this.repository.clear();
  }

  private calculateNextReviewDate(consecutiveCorrect: number): Date {
    const nextReviewDate = new Date();

    let days = 0;

    switch (consecutiveCorrect) {
      case 1:
        days = 1;
        break;

      case 2:
        days = 3;
        break;

      case 3:
        days = 7;
        break;

      case 4:
        days = 14;
        break;

      default:
        days = consecutiveCorrect >= 5 ? 30 : 0;
    }

    nextReviewDate.setDate(nextReviewDate.getDate() + days);

    return nextReviewDate;
  }

  isInReview(flashCardId: string): boolean {
    return this.repository.getByFlashCardId(flashCardId) !== undefined;
  }
}
