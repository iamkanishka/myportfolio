import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import { Tags, Tag } from '../../../Common/Utilities/Data';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  isshowDetails: boolean = false;
  articleDetailsData!: ProjectorArticle;

  Articles: ProjectorArticle[] = [];
  tagsData:Tag[] = [];



  constructor(
    private firebaseDBService: FirebaseDBService,
    private router: Router
  ) {
    this.tagsData = Tags
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
