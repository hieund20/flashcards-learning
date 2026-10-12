import { Injectable } from '@angular/core';
import { Retention } from '../models/retention';
import { LearningMode } from '../models/learning-mode';

@Injectable({
  providedIn: 'root',
})
export class RetentionRepository {
  private readonly STORAGE_KEY = 'retention-data';

  getAll(): Retention[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as Retention[];
    } catch (error) {
      console.error('Failed to load retention data.', error);
      return [];
    }
  }

  getByFlashCardId(
    flashCardId: string,
    learningMode: LearningMode,
  ): Retention | undefined {
    return this.getAll().find(
      (retention) =>
        retention.flashCardId === flashCardId &&
        retention.learningMode === learningMode,
    );
  }

  save(retentionData: Retention): void {
    const retentions = this.getAll();

    const index = retentions.findIndex(
      (retention) =>
        retention.flashCardId === retentionData.flashCardId &&
        retention.learningMode === retentionData.learningMode,
    );

    if (index >= 0) {
      retentions[index] = retentionData;
    } else {
      retentions.push(retentionData);
    }

    this.saveAll(retentions);
  }

  saveAll(retentions: Retention[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(retentions));
  }

  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
