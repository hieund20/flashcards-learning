import { Routes } from '@angular/router';
import { HomeComponent } from './features/flashcards/pages/home/home.component';
import { ReviewComponent } from './features/review/pages/review/review.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
];
