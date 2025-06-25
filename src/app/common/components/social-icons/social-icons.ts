import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-icons',
  standalone: true,
  templateUrl: './social-icons.html',
  styleUrl: './social-icons.css'
})
export class SocialIconsComponent {

  @Input('icon')
  Icon!:string

}
