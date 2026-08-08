export interface Retention {
  flashCardId: string;

  reviewCount: number;

  consecutiveCorrect: number;

  lastReviewedDate?: Date;

  nextReviewDate: Date;
}
