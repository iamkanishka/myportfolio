import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';

@Component({
  selector: 'app-projects-data',
  templateUrl: './projects-data.component.html',
  styleUrl: './projects-data.component.css',
})
export class ProjectsDataComponent {
  isshowDetails: boolean = false;

  constructor(private firebaseDBService: FirebaseDBService) {
    // firebaseDBService.addDcoument()
    // firebaseDBService.getDocuments()
  }

  AddProject() {
    this.isshowDetails = true;
  }

  onClose() {
    this.isshowDetails = false;
  }
}
