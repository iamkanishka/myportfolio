import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import { RestAPIServiceService } from '../../../firebase-db/MongodbRESTAPIDB/rest-apiservice.service';
import {
  Icategory,
  Tag,
  Tags,
  projectCategories,
} from '../../../Common/Utilities/Data';

interface ITagEmit {
  tag: Tag;
  operationType: 'remove' | 'add';
}

@Component({
  selector: 'app-projects-data',
  templateUrl: './projects-data.component.html',
  styleUrl: './projects-data.component.css',
})
export class ProjectsDataComponent {
  Projects: ProjectorArticle[] = [];
  selectedTags: Tag[] = [];
  tagsData: Tag[] = [];

  projectInput: string = '';

  projectsLoader: boolean = false;

  category: String[] = [];

  catergoryTitle: String = 'All';

  categoryData: Icategory[] = [];

  constructor(
    private firebaseDBService: FirebaseDBService,
    private restAPIServiceService: RestAPIServiceService,
    private router: Router
  ) {
    this.tagsData = Tags;
    this.category = ['All'];
    this.categoryData = projectCategories;
    this.getProjects();
  }



  async getProjects() {
    try {
      this.projectsLoader = true;
      const projects: any = await this.firebaseDBService.getAllDocuments(
        'projects',
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.category.length != 0 ? this.category : null,
        // this.projectInput.split('').length != 0
        //   ? this.projectInput.split('')
        //   :
        null
      );
      projects.forEach((doc: any) => {
        if (
          this.selectedTags.length != 0 ||
          this.projectInput.split('').length != 0
        ) {
          if (this.category[0] === 'Important') {
            let projectData = { ...doc.data() };
            if (projectData.categories.includes('Important')) {
              this.Projects.push({ id: doc.id, ...doc.data() });
            }
          } else {
            this.Projects.push({ id: doc.id, ...doc.data() });
          }
        } else {
          this.Projects.push({ id: doc.id, ...doc.data() });
        }
      });

      this.projectsLoader = false;
      //  this.lastProjectSanpshot = this.Projects[this.Projects.length - 1];
    } catch (err) {
      this.projectsLoader = false;

      console.log(err);
    }
  }

  redirectTOEdit(project: ProjectorArticle) {
    let navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(project) },
      queryParamsHandling: 'merge',
    };

    // Navigate to the login page with extras
    this.router.navigate(['/admin/project/edit'], navigationExtras);
  }

  async DeleteProject(id: string | undefined, index: number) {
    let Type = String(window.location).includes('project')
      ? 'projects'
      : 'articles';
    let text = 'Sure want to Cancel Article';
    if (confirm(text) == true) {
      const deletfromfireDB = await this.firebaseDBService.deleteDocumentId(
        String(id),
        Type
      );

      const deletfromMongoDB = await this.restAPIServiceService.deleteDoc(
        Type,
        String(id)
      );
      await Promise.all([deletfromfireDB, deletfromMongoDB]);

      this.Projects.splice(index, 1);
    } else {
      text = 'You canceled!';
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

  selectCategory(category: String) {
    this.catergoryTitle = category;
    this.Projects = [];
    this.category = [category];
    this.getProjects();
  }
}
