import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlashCard } from '../models/flash-card';
import { FlashCardRepository } from '../repositories/flash-card.repository';

@Injectable({
  providedIn: 'root',
})
export class FlashCardService {
  private readonly repository = inject(FlashCardRepository);

  getAll(): Observable<FlashCard[]> {
    return this.repository.getAll();
  }
}
