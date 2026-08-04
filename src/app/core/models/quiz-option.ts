import { FlashCard } from './flash-card';

export interface QuizOption {
  card: FlashCard;
  isCorrect: boolean;
}
