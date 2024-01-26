import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';

@Component({
  selector: 'app-projects',

  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  isshowDetails: boolean = false;
  projectDetailsData!: ProjectorArticle ;

  Projects: ProjectorArticle[] = [];

  constructor(
    private firebaseDBService: FirebaseDBService,
    private router: Router
  ) {
    window.scrollTo(0, 0);
    this.getProjects();
  }

  async getProjects() {
    try {
      let Type = String(window.location).includes('project')
        ? 'projects'
        : 'articles';

      const projects: any = await this.firebaseDBService.getAllDocuments(Type);
      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });

      console.log(this.Projects);
      
    } catch (err) {
      console.log(err);
    }
  }

  showDetails(project:ProjectorArticle) {
    this. projectDetailsData = project
    this.isshowDetails = true;

  }

  onClose() {
    this.isshowDetails = false;
  }
}
