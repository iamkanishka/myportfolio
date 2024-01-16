import { Component } from '@angular/core';
import { HeaderComponent } from '../Compoenents/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [ RouterOutlet, HeaderComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

}
