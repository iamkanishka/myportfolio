import { Component } from '@angular/core';
import { BlackHoleComponent } from '../black-hole/black-hole';

@Component({
  selector: 'app-root',
  imports: [BlackHoleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'myportfolio';
}
