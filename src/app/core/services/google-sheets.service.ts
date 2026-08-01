import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private readonly http = inject(HttpClient);

  private readonly url = `https://docs.google.com/spreadsheets/d/${environment.spreadsheetId}/gviz/tq?tqx=out:json&sheet=${environment.sheetName}`;

  getSheet(): Observable<string> {
    return this.http.get(this.url, {
      responseType: 'text',
    });
  }
}
