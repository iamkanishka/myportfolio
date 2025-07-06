import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, map, debounceTime, distinctUntilChanged } from 'rxjs';

import { NoData } from '../../common/components/no-data/no-data';
import { ProjectorArticleCard } from '../../common/components/project-article-card/project-article-card';
import { ProjectorArticleDetailPage } from '../../common/components/projector-article-detail/projector-article-detail';
import { TagsComponent } from '../../common/components/tags/tags';
import {
  Tag,
  Icategory,
  Tags,
  projectCategories,
} from '../../common/utilities/data';
import { FirebaseDBService } from '../../db/firebase.service';
import { RestAPIServiceService } from '../../db/mongo.service';
import { ProjectorArticle } from '../../types/project-article';
import { Loader } from '../../common/components/loader/loader';

interface ITagEmit {
  tag: Tag;
  operationType: 'remove' | 'add';
}

@Component({
  selector: 'app-projects',
  imports: [
    ProjectorArticleCard,
    TagsComponent,
    Loader,
    ProjectorArticleDetailPage,
    NgClass,
    NgStyle,
    NoData,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  isshowDetails: boolean = false;
  projectDetailsData!: ProjectorArticle;

  tagsData: Tag[] = [];

  Projects: ProjectorArticle[] = [];

  lastProjectSanpshot!: ProjectorArticle;
  lastbackupProjectSanpshot!: ProjectorArticle;

  projectsLoader: Boolean = false;

  selectedTags: Tag[] = [];

  category: string[] = [];
  categoryData: Icategory[] = [];

  catergoryTitle: String = 'Important';

  projectInput: string = '';

  originalState!: any;

  searchControl = new FormControl();

  constructor(
    private firebaseDBService: FirebaseDBService,
    private activatedRoute: ActivatedRoute,
    private restAPIServiceService: RestAPIServiceService,
    private router: Router
  ) {
    window.scrollTo(0, 0);

    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe((params) => {
        console.log(params);

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
        } else if (params.hasOwnProperty('category')) {
          this.catergoryTitle = String(params['category']);
          this.category = [String(params['category'])];
          this.initializeTagData();
        } else if (params.hasOwnProperty('search')) {
          this.projectInput = String(params['search']);
          this.initializeTagData();
        } else {
          this.category = ['Important'];
          this.initializeTagData();
        }

        this.categoryData = projectCategories;

        this.getProjects();
      });
    }
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
          // filter((text) => {console.log(text.length); return (text.length > 5 || text.length == 0  ) } ),
          debounceTime(800),
          distinctUntilChanged()
        )
        .subscribe((data) => {
          // Handle the data from the API
          this.projectInput = data;
          this.searchbyTitle();
        });
    }
  }

  async getProjects() {
    try {
      this.projectsLoader = true;

      if (this.projectInput.split('').length != 0) {
        this.getProjectsfromBackup();
        return;
      }

      const projects: any = await this.firebaseDBService.getAllDocuments(
        'projects',
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.category.length != 0 ? this.category : null
      );
      projects.forEach((doc: any) => {
        if (this.selectedTags.length != 0) {
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
      this.lastProjectSanpshot = this.Projects[this.Projects.length - 1];
    } catch (err) {
      console.log(err);
      this.getProjectsfromBackup();
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
      this.getProjectByUnqId(id);
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

      if (this.projectInput.split('').length != 0) {
        this.getProjectsfromBackup();
        return;
      }

      const projects: any = await this.firebaseDBService.paginateLoadMore(
        'projects',
        this.lastProjectSanpshot,
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.category.length != 0 ? this.category : null
      );

      projects.forEach((doc: any) => {
        if (this.selectedTags.length != 0) {
          if (this.category[0] === 'Important') {
            let projectData = { ...doc.data() };
            if (projectData.categories.includes('Important')) {
              this.Projects.push({ id: doc.id, ...doc.data() });
            }
          } else {
            this.Projects.push({ id: doc.id, ...doc.data() });
          }
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

    const index = this.selectedTags.findIndex(
      (tagData) =>
        String(tagData.lang).toLowerCase() ===
        String(tempTag.lang).toLowerCase()
    );
    console.log('Index to remove:', index);

    console.log(tag.operationType);

    if (tag.operationType === 'remove') {
      this.selectedTags.splice(index, 1);
      console.log(this.selectedTags);
    } else {
      this.selectedTags.push(tempTag);
    }
    console.log(this.selectedTags);

    if (this.selectedTags.length !== 0) {
      this.router.navigate([], {
        queryParams: { tags: this.scrapeTagsLang().join(',') },
      });
    } else {
      this.router.navigate(['/projects']);
    }

    // this.getProjects();
  }

  scrapeTagsLang() {
    return this.selectedTags.map((tags) => {
      return tags.lang;
    });
  }

  selectCategory(category: string) {
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

  async getProjectsfromBackup() {
    try {
      this.projectsLoader = true;

      let alterTags = this.selectedTags.map((tag: Tag) => {
        return tag.lang;
      });

      const filterString = JSON.stringify({
        alternativeTags: alterTags.length != 0 ? alterTags : null,
        categories: this.category.length != 0 ? this.category : null,
        searchKeys:
          this.projectInput.length != 0
            ? this.projectInput.toLowerCase()
            : null,
        skip:
          this.lastbackupProjectSanpshot === null &&
          this.lastbackupProjectSanpshot === undefined
            ? null
            : this.lastbackupProjectSanpshot.created_at,
      });

      console.log(filterString);

      const projects = await this.restAPIServiceService.GetDocsBySearch(
        'project',
        filterString
      );
      console.log(projects);
      this.Projects = projects;

      this.lastbackupProjectSanpshot = this.Projects[this.Projects.length - 1];

      this.projectsLoader = false;
    } catch (err) {
      this.projectsLoader = false;

      console.log(err);
    }
  }

  async getProjectByUnqId(unqid: string) {
    let projectData = await this.restAPIServiceService.GetDocbyUniqueId(
      'project',
      unqid
    );

    if (projectData!.data() != undefined) {
      this.showDetails(projectData!.data() as ProjectorArticle);
    }
  }
}
