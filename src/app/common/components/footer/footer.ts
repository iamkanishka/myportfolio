import { Component } from '@angular/core';
import { SocialIconsComponent } from '../social-icons/social-icons';

@Component({
  selector: 'app-footer',
  imports: [SocialIconsComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear: string = 'Copyright @' + String(new Date().getFullYear());
}
