import { Component } from '@angular/core';
import { ProjectsdetailsComponent } from './projectsdetails/projectsdetails.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectsdetailsComponent],
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
