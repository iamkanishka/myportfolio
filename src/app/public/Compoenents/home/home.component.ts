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

  constructor(private viewportScroller: ViewportScroller,   private firebaseDBService: FirebaseDBService,) {
    this.getProjects()
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

}
