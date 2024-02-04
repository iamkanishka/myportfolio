import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import { Tags, Tag } from '../../../Common/Utilities/Data';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';


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

  lastArticleSanpshot! : ProjectorArticle

  articlesLoader:Boolean=false


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
      this.articlesLoader = true;

      const articles: any = await this.firebaseDBService.getAllDocuments(
        'articles',
        9
      );

      articles.forEach((doc: any) => {
        this.Articles.push({ id: doc.id, ...doc.data() });
      });
      this.lastArticleSanpshot = this.Articles[this.Articles.length-1]
      this.articlesLoader = false;
 
   } catch (err) {
    this.articlesLoader = false;

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

  async loadMore(){
    try {
      this.articlesLoader = true;
      const articles: any = await this.firebaseDBService.paginateLoadMore(
        'articles',
        this.lastArticleSanpshot,
        9
      );
      articles.forEach((doc: any) => {
        this.Articles.push({ id: doc.id, ...doc.data() });
      });

      this.articlesLoader = false;

       
      this.lastArticleSanpshot = this.Articles[this.Articles.length-1]


    } catch (err) {
      this.articlesLoader = false;

      console.log(err);
    }
  }
}
