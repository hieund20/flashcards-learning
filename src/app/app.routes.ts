import { Routes } from '@angular/router';
import { HomeComponent } from './features/flashcards/pages/home/home.component';
import { QuizComponent } from './features/quiz/pages/quiz/quiz.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
];
