import { Injectable } from '@angular/core';
import { FlashCard } from '../models/flash-card';
import { QuizQuestion } from '../models/quiz-question';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  generateQuestion(cards: FlashCard[]): QuizQuestion {
    const correctCard = this.getRandomCard(cards);
    const wrongCards = this.getRandomWrongAnswers(cards, correctCard);

    const options = [
      {
        card: correctCard,
        isCorrect: true,
      },
      ...wrongCards.map((card) => ({
        card,
        isCorrect: false,
      })),
    ];

    return {
      question: correctCard,
      options: this.shuffle(options),
    };
  }

  private getRandomCard(cards: FlashCard[]): FlashCard {
    if (cards.length === 0) {
      throw new Error('No flashcards available.');
    }

    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  }

  private getRandomWrongAnswers(
    cards: FlashCard[],
    correctCard: FlashCard,
  ): FlashCard[] {
    if (cards.length < 4) {
      throw new Error('At least 4 flashcards are required to generate a quiz.');
    }

    const wrongCards = cards.filter((card) => card.id !== correctCard.id);
    const shuffled = this.shuffle(wrongCards);
    return shuffled.slice(0, 3);
  }

  private shuffle<T>(items: T[]): T[] {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }
}
