import {  ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';

@Component({
  selector: 'app-home',
   templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  clickedLink:string = 'home'
  Projects: ProjectorArticle[] = [];
  Articles: ProjectorArticle[] = [];


  constructor(private viewportScroller: ViewportScroller,   private firebaseDBService: FirebaseDBService,) {
    this.getProjects();
    this.getArticles();
  }
  public onClick(elementId: string): void { 
    this.clickedLink = elementId
    this.viewportScroller.scrollToAnchor(elementId);

  }



  async getProjects() {
    try {
      
     const projects: any = await this.firebaseDBService.getAllDocuments('projects', 3);
      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.log(err);
    }
  }


  async getArticles() {
    try {
      
     const articles: any = await this.firebaseDBService.getAllDocuments('articles', 3);
     articles.forEach((doc: any) => {
        this.Articles.push({ id: doc.id, ...doc.data() });
      });
      console.log(this.Articles);
      
    } catch (err) {
      console.log(err);

    }
  }

}
