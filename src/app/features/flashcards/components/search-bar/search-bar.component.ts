import {
  Component,
  output,
  signal,
  ElementRef,
  viewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  readonly searchChanged = output<string>();
  readonly keyword = signal('');
  readonly input = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  onInput(value: string): void {
    this.keyword.set(value);

    this.searchChanged.emit(value);
  }

  clear(): void {
    this.keyword.set('');
    this.searchChanged.emit('');
    this.input()?.nativeElement.focus();
  }
}
