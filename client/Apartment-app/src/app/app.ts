import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // הייבוא הקריטי לניווט
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // וודאי שזה מופיע כאן
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Apartment-app');
}
