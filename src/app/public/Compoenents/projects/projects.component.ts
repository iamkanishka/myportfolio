import { Component } from '@angular/core';
 
@Component({
  selector: 'app-projects',
  
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  isshowDetails: boolean = false;
  constructor() {
    window.scrollTo(0, 0);
  }
  showDetails() {
    this.isshowDetails = true;
  }

  onClose(){
    this.isshowDetails = false;

  }
}
