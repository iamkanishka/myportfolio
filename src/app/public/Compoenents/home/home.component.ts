import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  clickedLink: string = 'home';
  Projects: ProjectorArticle[] = [];
  Articles: ProjectorArticle[] = [];

  isshowDetails: boolean = false;
  

  mailData = {
    name: '',
    subject: '',
    body: '',
  };
 
  ProjectorArticleDetailsData! :ProjectorArticle
 
  isScrolled = false;

  projectsLoader:Boolean=false
  articlesLoader:Boolean=false


  constructor(
    private viewportScroller: ViewportScroller,
    private firebaseDBService: FirebaseDBService
  ) {
    this.getProjects();
    this.getArticles();
  }
  public onClick(elementId: string): void {
    this.clickedLink = elementId;
    if(elementId === 'home'){
          window.scrollTo(0,0);
    }else{

    this.viewportScroller.scrollToAnchor(elementId);
  }

  }




  async getProjects() {
    try {
      this.projectsLoader = true

      const projects: any = await this.firebaseDBService.getAllDocuments(
        'projects',
        3,
        null
      );
      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });
      this.projectsLoader = false

    } catch (err) {
      this.projectsLoader = false

      console.log(err);
    }
  }

  async getArticles() {
    try {
      this.articlesLoader = true;

      const articles: any = await this.firebaseDBService.getAllDocuments(
        'articles',
        3, null
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
 
  triggeMail(){
    console.log(this.mailData);
    
    var anchor = document.createElement('a');
    anchor.href = `mailto:kanishkanaik97@gmail.com?subject=${this.mailData.subject}&body=${this.mailData.name}\n${this.mailData.body}`;
    anchor.target = "_blank";
    anchor.click();
  }

 

}
