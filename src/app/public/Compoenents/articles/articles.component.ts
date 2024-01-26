import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  isshowDetails: boolean = false;
  articleDetailsData!: ProjectorArticle;

  Articles: ProjectorArticle[] = [];

  constructor(
    private firebaseDBService: FirebaseDBService,
    private router: Router
  ) {
    window.scrollTo(0, 0);
    this.getArticles();
  }

  async getArticles() {
    try {
      const articles: any = await this.firebaseDBService.getAllDocuments(
        'articles'
      );
      articles.forEach((doc: any) => {
        this.Articles.push({ id: doc.id, ...doc.data() });
      });

      console.log(this.Articles);
    } catch (err) {
      console.log(err);
    }
  }

  showDetails(project: ProjectorArticle) {
    this.articleDetailsData = project;
    this.isshowDetails = true;
  }

  onClose() {
    this.isshowDetails = false;
  }
}
