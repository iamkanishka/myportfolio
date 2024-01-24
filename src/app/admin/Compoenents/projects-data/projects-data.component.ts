import { Component, Inject } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';

@Component({
  selector: 'app-projects-data',
  templateUrl: './projects-data.component.html',
  styleUrl: './projects-data.component.css',
})
export class ProjectsDataComponent {
  Projects: ProjectorArticle[] = [];

  constructor(private firebaseDBService: FirebaseDBService, private router: Router) {
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


  redirectTOEdit(project:ProjectorArticle){

    let navigationExtras: NavigationExtras = {
      queryParams: {data: JSON.stringify(project)} ,
      queryParamsHandling: 'merge'
     
    };
    
    // Navigate to the login page with extras
    this.router.navigate(['/admin/project/edit'], navigationExtras);
  }
}
