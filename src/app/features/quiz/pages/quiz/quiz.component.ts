import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FlashCard } from '../../../../core/models/flash-card';
import { QuizOption } from '../../../../core/models/quiz-option';
import { QuizQuestion } from '../../../../core/models/quiz-question';
import { FlashCardService } from '../../../../core/services/flash-card.service';
import { QuizService } from '../../../../core/services/quiz.service';

@Component({
  selector: 'app-quiz',
  imports: [MatButtonModule, MatCardModule, RouterLink, MatIconModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  private readonly flashCardService = inject(FlashCardService);
  private readonly quizService = inject(QuizService);
  private flashCards: FlashCard[] = [];

  // Current question
  protected question?: QuizQuestion;
  protected selectedOption?: QuizOption;
  protected answered = false;

  // Quiz session
  protected readonly totalQuestions = 10;
  protected currentQuestionNumber = 1;
  protected correctAnswers = 0;
  protected wrongAnswers = 0;
  protected quizCompleted = false;

  ngOnInit(): void {
    this.flashCardService.getAll().subscribe((cards) => {
      this.flashCards = cards;

      this.generateQuestion();
    });
  }

  protected generateQuestion(): void {
    if (this.currentQuestionNumber > this.totalQuestions) {
      this.quizCompleted = true;
      return;
    }

    this.question = this.quizService.generateQuestion(this.flashCards);
    this.selectedOption = undefined;
    this.answered = false;
  }

  protected nextQuestion(): void {
    this.currentQuestionNumber++;

    this.generateQuestion();
  }

  protected selectAnswer(option: QuizOption): void {
    if (this.answered) {
      return;
    }

    this.selectedOption = option;
    this.answered = true;

    if (option.isCorrect) {
      this.correctAnswers++;
    } else {
      this.wrongAnswers++;
    }
  }

  protected get score(): number {
    return Math.round((this.correctAnswers / this.totalQuestions) * 100);
  }

  protected get performanceMessage(): string {
    if (this.score >= 90) {
      return 'Excellent!';
    }

    if (this.score >= 70) {
      return 'Great Job!';
    }

    if (this.score >= 50) {
      return 'Good Effort!';
    }

    return 'Keep Practicing!';
  }

  protected restartQuiz(): void {
    this.currentQuestionNumber = 1;

    this.correctAnswers = 0;

    this.wrongAnswers = 0;

    this.quizCompleted = false;

    this.question = undefined;

    this.generateQuestion();
  }
}
