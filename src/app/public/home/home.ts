import { NgClass, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseDBService } from '../../db/firebase.service';
import { ProjectorArticle } from '../../types/projectorarticle';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectorArticleCard } from '../../common/components/project-article-card/project-article-card';
import { Loader } from '../../common/components/loader/loader';
import { NoData } from '../../common/components/no-data/no-data';
import { SocialIconsComponent } from '../../common/components/social-icons/social-icons';
import { ProjectorArticleDetailPage } from '../../common/components/projector-article-detail/projector-article-detail';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    RouterLink,
    ProjectorArticleCard,
    Loader,
    NoData,
    SocialIconsComponent,
    ProjectorArticleDetailPage,
    NgClass,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  clickedLink: string = 'home';
  Projects: ProjectorArticle[] = [];
  Articles: ProjectorArticle[] = [];

  isshowDetails: boolean = false;

  mailData = {
    name: '',
    subject: '',
    body: '',
  };

  ProjectorArticleDetailsData!: ProjectorArticle;

  isScrolled = false;

  projectsLoader: Boolean = false;
  articlesLoader: Boolean = false;

  constructor(
    private viewportScroller: ViewportScroller,
    private firebaseDBService: FirebaseDBService
  ) {
    this.getProjects();
    this.getArticles();
  }
  public onClick(elementId: string): void {
    this.clickedLink = elementId;
    if (elementId === 'home') {
      window.scrollTo(0, 0);
    } else {
      this.viewportScroller.scrollToAnchor(elementId);
    }
  }

  async getProjects() {
    try {
      this.projectsLoader = true;

      const projects: any = await this.firebaseDBService.getAllDocuments(
        'projects',
        3,
        null,
        ['Important']
      );
      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });
      this.projectsLoader = false;
    } catch (err) {
      this.projectsLoader = false;

      console.log(err);
    }
  }

  async getArticles() {
    try {
      this.articlesLoader = true;

      const articles: any = await this.firebaseDBService.getAllDocuments(
        'articles',
        3,
        null,
        ['Important']
      );
      articles.forEach((doc: any) => {
        this.Articles.push({ id: doc.id, ...doc.data() });
      });

      this.articlesLoader = false;
    } catch (err) {
      this.articlesLoader = false;

      console.log(err);
    }
  }

  showDetails(projectorArticle: ProjectorArticle) {
    this.ProjectorArticleDetailsData = projectorArticle;
    this.isshowDetails = true;
  }

  onClose() {
    this.isshowDetails = false;
  }

  triggeMail() {
    var anchor = document.createElement('a');
    anchor.href = `mailto:kanishkanaik97@gmail.com?subject=${this.mailData.subject}&body=${this.mailData.name}\n${this.mailData.body}`;
    anchor.target = '_blank';
    anchor.click();
  }
}
