import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-icons',
  standalone: true,
 
  templateUrl: './social-icons.component.html',
  styleUrl: './social-icons.component.css'
})
export class SocialIconsComponent {

  @Input('icon')
  Icon!:string

}
