import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import { Tags, Tag } from '../../../Common/Utilities/Data';
import { ActivatedRoute } from '@angular/router';

interface ITagEmit {
  tag: Tag;
  operationType: 'remove' | 'add';
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  isshowDetails: boolean = false;
  projectDetailsData!: ProjectorArticle;

  tagsData: Tag[] = [];

  Projects: ProjectorArticle[] = [];

  lastProjectSanpshot!: ProjectorArticle;

  projectsLoader: Boolean = false;

  selectedTags: Tag[] = [];

  constructor(
    private firebaseDBService: FirebaseDBService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe((params) => {
        if (params.hasOwnProperty('tags')) {
          var tags: String[] = String(params['tags']).split(',');
          this.tagsData = Tags.map((tag: Tag) => {
            let isItRightTag = tags.includes(tag.lang);
            if (isItRightTag) {
              this.selectedTags.push(tag);
            }
            return { ...tag, selected: isItRightTag };
          });
        } else if (params.hasOwnProperty('id')) {
          this.getProjectById(String(params['id']));
          this.initializeTagData();
        } else {
          this.initializeTagData();
        }
      });
    }

    window.scrollTo(0, 0);
    this.getProjects();
  }

  initializeTagData() {
    this.tagsData = Tags.map((tag: Tag) => {
      return { ...tag, selected: false };
    });
  }

  async getProjects() {
    try {
      this.projectsLoader = true;
      const projects: any = await this.firebaseDBService.getAllDocuments(
        'projects',
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null
      );

      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });

      this.projectsLoader = false;
      this.lastProjectSanpshot = this.Projects[this.Projects.length - 1];
    } catch (err) {
      this.projectsLoader = false;

      console.log(err);
    }
  }

  async getProjectById(id: string) {
    try {
      let projectData = await this.firebaseDBService.getDocumentId(
        id,
        'projects'
      );

      if (projectData!.data() != undefined) {
        this.showDetails(projectData!.data() as ProjectorArticle);
      }
    } catch (err) {
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

  async loadMore() {
    try {
      this.projectsLoader = true;

      const projects: any = await this.firebaseDBService.paginateLoadMore(
        'projects',
        this.lastProjectSanpshot,
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null
      );

      if (projects.length != 9) {
      }

      projects.forEach((doc: any) => {
        this.Projects.push({ id: doc.id, ...doc.data() });
      });
      this.projectsLoader = false;

      this.lastProjectSanpshot = this.Projects[this.Projects.length - 1];
    } catch (err) {
      this.projectsLoader = false;

      console.log(err);
    }
  }

  selectTag(tag: ITagEmit) {
    this.Projects = [];
    let tempTag = JSON.parse(JSON.stringify(tag.tag));
    delete tempTag.selected;

    if (tag.operationType === 'remove') {
      this.selectedTags.splice(
        this.selectedTags.findIndex((tagData) => tagData.lang === tempTag.lang),
        1
      );
    } else {
      this.selectedTags.push(tempTag);
    }
    this.getProjects();
  }
}
