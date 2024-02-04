import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import { Tags, Tag } from '../../../Common/Utilities/Data';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  isshowDetails: boolean = false;
  projectDetailsData!: ProjectorArticle;

  tagsData:Tag[] = [];

  Projects: ProjectorArticle[] = [];

  lastProjectSanpshot! : ProjectorArticle

  projectsLoader:Boolean=false

  constructor(
    private firebaseDBService: FirebaseDBService,
  ) {
    this.tagsData = Tags
    window.scrollTo(0, 0);
    this.getProjects();
  }

  async getProjects() {
    try {
      this.projectsLoader = true
      const projects: any = await this.firebaseDBService.getAllDocuments(
        'projects'
      );
    
      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });

      this.projectsLoader = false
      console.log(this.Projects);
      

      this.lastProjectSanpshot =  this.Projects[ this.Projects.length-1];
    

    } catch (err) {
      this.projectsLoader = false

      console.log(err);
    }
  }

  showDetails(project: ProjectorArticle) {
    this.projectDetailsData = project;
    this.isshowDetails = true;
  }

  onClose() {
    this.isshowDetails = false;
  }

 async loadMore(){
    try {
      this.projectsLoader = true;

      const projects: any = await this.firebaseDBService.paginateLoadMore(
        'projects',
        this.lastProjectSanpshot,
        9
      );

      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });
      this.projectsLoader = false;

      this.lastProjectSanpshot =  this.Projects[ this.Projects.length-1];


    } catch (err) {
      this.projectsLoader = false;

      console.log(err);
    }
  }
}
