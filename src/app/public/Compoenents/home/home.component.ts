import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
   templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  clickedLink:string = 'home'
  constructor(private viewportScroller: ViewportScroller) {}
  public onClick(elementId: string): void { 
    this.clickedLink = elementId
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
