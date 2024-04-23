import { Component, HostListener } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import {
  Tags,
  Tag,
  Icategory,
  projectCategories,
} from '../../../Common/Utilities/Data';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

// export for others scripts to use

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

  category: String[] = [];
  categoryData: Icategory[] = [];

  catergoryTitle: String = 'Important';

  projectInput: string = '';

  originalState!: any;

  searchControl = new FormControl();
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

    this.categoryData = projectCategories;
    this.category = ['Important'];
    window.scrollTo(0, 0);
    this.getProjects();
  }

  initializeTagData() {
    this.tagsData = Tags.map((tag: Tag) => {
      return { ...tag, selected: false };
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  ngAfterViewInit(): void {
    const searchBox = document.getElementById('search-box') as HTMLInputElement;
    if (searchBox) {
      fromEvent(searchBox, 'input')
        .pipe(
          map((e) => (e.target as HTMLInputElement).value),
          //  filter(text => text.length > 2),
          debounceTime(800),
          distinctUntilChanged()
        )
        .subscribe((data) => {
          // Handle the data from the API
          this.projectInput = data;
          this.searchbyTitle();
          console.log(typeof data, data);
        });
    }
  }

  async getProjects() {
    try {
      this.projectsLoader = true;
      const projects: any = await this.firebaseDBService.getAllDocuments(
        'projects',
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.category.length != 0 ? this.category : null,
        this.projectInput.split('').length != 0
          ? this.projectInput.split('')
          : null
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

      console.log(this.Projects);

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
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.projectInput.split('').length != 0
          ? this.projectInput.split('')
          : null
      );

      projects.forEach((doc: any) => {
        if (this.category[0] === 'Important') {
          let projectData = { ...doc.data() };
          if (projectData.categories.includes('Important')) {
            this.Projects.push({ id: doc.id, ...doc.data() });
          }
        } else {
          this.Projects.push({ id: doc.id, ...doc.data() });
        }
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
    console.log(this.selectedTags, this.category);

    this.getProjects();
  }

  selectCategory(category: String) {
    this.catergoryTitle = category;
    this.Projects = [];
    this.category = [category];
    this.getProjects();
  }

  searchbyTitle() {
    this.Projects = [];
    this.cleartags();
    this.getProjects();
  }

  cleartags() {
    this.selectedTags = [];
    this.tagsData = Tags.map((tag: Tag) => {
      return { ...tag, selected: false };
    });
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: Event) {
  //   // Check if the user has scrolled to the bottom
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     // User has scrolled to the bottom, you can perform your action here
  //     // setTimeout(()=>{
  //     //   console.log('Scrolled to the bottom');
  //        this.loadMore();
  //     // }, 5000)

  //   }
  // }
}
