import { Component } from '@angular/core';
import { HeaderComponent } from '../Compoenents/header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
})
export class MasterComponent {
  headerVisibility: Boolean = true;
  constructor(protected router: Router) {

     router.events.subscribe((event: any) => {
      this.headerVisibility = ( event.url === '/home' || event.url === '/' ) ? false : true;
    });
  }
}
