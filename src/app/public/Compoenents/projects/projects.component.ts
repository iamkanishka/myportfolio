import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import { Tags, Tag } from '../../../Common/Utilities/Data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  isshowDetails: boolean = false;
  projectDetailsData!: ProjectorArticle;

  tagsData:Tag[] = [];

  Projects: ProjectorArticle[] = [];

  constructor(
    private firebaseDBService: FirebaseDBService,
    private router: Router
  ) {
    this.tagsData = Tags
    window.scrollTo(0, 0);
    this.getProjects();
  }

  async getProjects() {
    try {
      const projects: any = await this.firebaseDBService.getAllDocuments(
        'projects'
      );
      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });

      console.log(this.Projects);
    } catch (err) {
      console.log(err);
    }
  }

  showDetails(project: ProjectorArticle) {
    this.projectDetailsData = project;
    this.isshowDetails = true;
  }

  onClose() {
    this.isshowDetails = false;
  }
}
