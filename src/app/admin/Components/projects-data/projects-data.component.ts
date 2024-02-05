import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import { RestAPIServiceService } from '../../../firebase-db/MongodbRESTAPIDB/rest-apiservice.service';

@Component({
  selector: 'app-projects-data',
  templateUrl: './projects-data.component.html',
  styleUrl: './projects-data.component.css',
})
export class ProjectsDataComponent {
  Projects: ProjectorArticle[] = [];

  constructor(
    private firebaseDBService: FirebaseDBService,
    private restAPIServiceService: RestAPIServiceService,
    private router: Router
  ) {
    this.getProjects();
  }

  async getProjects() {
    try {
      let Type = String(window.location).includes('project')
        ? 'projects'
        : 'articles';

      const projects: any = await this.firebaseDBService.getAllDocuments(Type,3,null);
      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.log(err);
    }
  }

  redirectTOEdit(project: ProjectorArticle) {
    let navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(project) },
      queryParamsHandling: 'merge',
    };

    // Navigate to the login page with extras
    this.router.navigate(['/admin/project/edit'], navigationExtras);
  }

  async DeleteProject(id: string | undefined, index: number) {
    let Type = String(window.location).includes('project')
      ? 'projects'
      : 'articles';
    let text = 'Sure want to Cancel Article';
    if (confirm(text) == true) {
      const deletfromfireDB = await this.firebaseDBService.deleteDocumentId(
        String(id),
        Type
      );

      const deletfromMongoDB = await this.restAPIServiceService.deleteDoc(
        Type,
        String(id)
      );
      await Promise.all([deletfromfireDB, deletfromMongoDB]);

      this.Projects.splice(index, 1);
    } else {
      text = 'You canceled!';
    }
  }
}
