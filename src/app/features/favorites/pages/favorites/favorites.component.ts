import { Component, inject } from '@angular/core';
import { FavoriteService } from '../../../../core/services/favorite.service';
import { FlashCardService } from '../../../../core/services/flash-card.service';
import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites',
  imports: [MatCardModule, AsyncPipe, MatIconModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  private readonly flashCardService = inject(FlashCardService);
  protected readonly favoriteService = inject(FavoriteService);

  protected readonly favoriteCards$ = this.flashCardService.getAll().pipe(
    map((cards) => {
      const favorites = this.favoriteService.favorites();

      return cards.filter((card) => favorites.has(card.id));
    }),
  );
}
