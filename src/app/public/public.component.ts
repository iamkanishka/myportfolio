import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatestAll, last, pipe } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
})
export class PublicComponent {
  headerVisibility: Boolean = true;

  constructor(protected router: Router) {
    router.events.subscribe((event: any) => {
      this.headerVisibility =
        this.router.url === '/home' || this.router.url === '/' ? false : true;
    });
  }
}
