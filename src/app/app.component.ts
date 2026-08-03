import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './features/flashcards/components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'english-flashcards-extension';
}
