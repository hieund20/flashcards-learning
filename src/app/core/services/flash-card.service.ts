import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlashCard } from '../models/flash-card';
import { LearningMode } from '../models/learning-mode';
import { FlashCardRepository } from '../repositories/flash-card.repository';

@Injectable({
  providedIn: 'root',
})
export class FlashCardService {
  private readonly repository = inject(FlashCardRepository);

  getAll(mode: LearningMode): Observable<FlashCard[]> {
    return this.repository.getAll(mode);
  }
}
