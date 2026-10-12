import { LearningMode } from "./learning-mode";

export interface Retention {
  flashCardId: string;
  learningMode: LearningMode;
  reviewCount: number;
  consecutiveCorrect: number;
  lastReviewedDate?: Date;
  nextReviewDate: Date;
}
