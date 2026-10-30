import { Component, signal } from '@angular/core';
import { Login } from './login/login';

@Component({
  imports: [Login],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
