import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LearningMode } from '../models/learning-mode';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private readonly http = inject(HttpClient);

  getSheet(mode: LearningMode): Observable<string> {
    const sheetName =
      mode === 'TOEIC'
        ? environment.toeicSheetName
        : environment.ieltsSheetName;

    const url =
      `https://docs.google.com/spreadsheets/d/${environment.spreadsheetId}` +
      `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

    return this.http.get(url, {
      responseType: 'text',
    });
  }
}
