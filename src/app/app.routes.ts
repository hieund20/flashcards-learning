import { Routes } from '@angular/router';
import { HomeComponent } from './features/flashcards/pages/home/home.component';
import { QuizComponent } from './features/quiz/pages/quiz/quiz.component';
import { FavoritesComponent } from './features/favorites/pages/favorites/favorites.component';

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
];
