import { FlashCard } from './flash-card';
import { QuizOption } from './quiz-option';

export interface QuizQuestion {
  question: FlashCard;
  options: QuizOption[];
}
