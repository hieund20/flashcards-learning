import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { FlashCard } from '../models/flash-card';
import { GoogleSheetsService } from '../services/google-sheets.service';

@Injectable({
  providedIn: 'root',
})
export class FlashCardRepository {
  private readonly googleSheetsService = inject(GoogleSheetsService);

  getAll(): Observable<FlashCard[]> {
    return this.googleSheetsService
      .getSheet()
      .pipe(map((response) => this.parseGoogleResponse(response)));
  }

  private parseGoogleResponse(response: string): FlashCard[] {
    const json = response.substring(
      response.indexOf('(') + 1,
      response.lastIndexOf(')'),
    );

    const data = JSON.parse(json);

    const rows = data.table.rows;

    return rows
      .slice(1) // Skip header row
      .map(
        (row: any, index: number): FlashCard => ({
          id: String(index + 1),

          word: row.c[0]?.v ?? '',

          meaning: row.c[1]?.v ?? '',

          example: row.c[2]?.v ?? '',

          type: row.c[3]?.v ?? '',

          level: row.c[4]?.v ?? '',

          category: row.c[5]?.v ?? '',
        }),
      );
  }
}
