import { Component, Inject } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';

@Component({
  selector: 'app-articles-data',
  standalone: false,
  templateUrl: './articles-data.component.html',
  styleUrl: './articles-data.component.css',
})
export class ArticlesDataComponent {
  Projects: ProjectorArticle[] = [];

  constructor(
    private firebaseDBService: FirebaseDBService,
    private router: Router
  ) {
    this.getArticles();
  }

  async getArticles() {
    try {
      let Type = String(window.location).includes('project')
        ? 'projects'
        : 'articles';

      const projects: any = await this.firebaseDBService.getAllDocuments(Type, 9, null,['All'],[]);
      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.log(err);
    }
  }

  redirectTOEdit(article: ProjectorArticle) {
    let navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(article) },
      queryParamsHandling: 'merge',
    };

    // Navigate to the login page with extras
    this.router.navigate(['/admin/article/edit'], navigationExtras);
  }


  async DeleteArticles(id:string | undefined, index:number){
    let Type = String(window.location).includes('project')
    ? 'projects'
    : 'articles';
    let text = "Sure want to Cancel Article";
    if (confirm(text) == true) {
      const projects: any = await this.firebaseDBService.deleteDocumentId(String(id),Type);
      this.Projects.splice(index,1)
    } else {
      text = "You canceled!";
    }
  }

}
