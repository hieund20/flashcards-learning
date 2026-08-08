import { Routes } from '@angular/router';
import { HomeComponent } from './features/flashcards/pages/home/home.component';
import { QuizComponent } from './features/quiz/pages/quiz/quiz.component';
import { FavoritesComponent } from './features/favorites/pages/favorites/favorites.component';
import { ReviewComponent } from './features/review/pages/review/review.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
];
