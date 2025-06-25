import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  fromEvent,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { NoData } from '../../common/components/no-data/no-data';
import { ProjectorArticleCard } from '../../common/components/project-article-card/project-article-card';
import { ProjectorArticleDetailPage } from '../../common/components/projector-article-detail/projector-article-detail';
import { TagsComponent } from '../../common/components/tags/tags';
import { Tag, Icategory, Tags, articleCategories } from '../../common/utilities/data';
import { FirebaseDBService } from '../../db/firebase.service';
import { RestAPIServiceService } from '../../db/mongo.service';
import { ProjectorArticle } from '../../types/projectorarticle';
import { Loader } from '../../common/components/loader/loader';



interface ITagEmit {
  tag: Tag;
  operationType: 'remove' | 'add';
}

@Component({
  selector: 'app-articles',
  imports: [
    ProjectorArticleCard,
    TagsComponent,
    Loader,
    ProjectorArticleDetailPage,
    NgClass,
    NgStyle,
    NoData
  ],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  isshowDetails: boolean = false;
  articleDetailsData!: ProjectorArticle;

  Articles: ProjectorArticle[] = [];
  tagsData: Tag[] = [];

  lastArticleSanpshot!: ProjectorArticle;

  articlesLoader: Boolean = false;
  selectedTags: Tag[] = [];

  category: string[] = [];
  categoryData: Icategory[] = [];

  catergoryTitle: string = 'Important';

  articleInput: string = '';

  searchControl = new FormControl();
  lastbackupProjectSanpshot!: ProjectorArticle;

  projectInput: string = '';

  constructor(
    private firebaseDBService: FirebaseDBService,
    private activatedRoute: ActivatedRoute,
    private restAPIServiceService: RestAPIServiceService
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
        }

        if (params.hasOwnProperty('id')) {
          this.getArticleById(String(params['id']));
        }
      });
    }

    this.categoryData = articleCategories;

    this.category = [this.catergoryTitle];

    window.scrollTo(0, 0);
    this.getArticles();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const searchBox = document.getElementById('search-box') as HTMLInputElement;
    if (searchBox) {
      fromEvent(searchBox, 'input')
        .pipe(
          map((e) => (e.target as HTMLInputElement).value),
          filter((text) => text.length > 5),
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

  async getArticles() {
    try {
      this.articlesLoader = true;

      if (this.projectInput.split('').length != 0) {
        this.getProjectsfromBackup();
        return;
      }

      const articles: any = await this.firebaseDBService.getAllDocuments(
        'articles',
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.category.length != 0 ? this.category : null
      );

      articles.forEach((doc: any) => {
        if (this.selectedTags.length != 0) {
          if (this.category[0] === 'Important') {
            let articletData = { ...doc.data() };

            if (articletData.categories.includes('Important')) {
              this.Articles.push({ id: doc.id, ...doc.data() });
            }
          } else {
            this.Articles.push({ id: doc.id, ...doc.data() });
          }
        }
      });
      this.lastArticleSanpshot = this.Articles[this.Articles.length - 1];
      this.articlesLoader = false;
    } catch (err) {
      this.articlesLoader = false;

      console.log(err);
    }
  }

  async getArticleById(id: string) {
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
    this.articleDetailsData = project;
    this.isshowDetails = true;
  }

  onClose() {
    this.isshowDetails = false;
  }

  async loadMore() {
    try {
      this.articlesLoader = true;

      if (this.projectInput.split('').length != 0) {
        this.getProjectsfromBackup();
        return;
      }

      const articles: any = await this.firebaseDBService.paginateLoadMore(
        'articles',
        this.lastArticleSanpshot,
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.category.length != 0 ? this.category : null
      );
      articles.forEach((doc: any) => {
        if (this.selectedTags.length != 0) {
          if (this.category[0] === 'Important') {
            let articletData = { ...doc.data() };
            if (articletData.categories.includes('Important')) {
              this.Articles.push({ id: doc.id, ...doc.data() });
            }
          } else {
            this.Articles.push({ id: doc.id, ...doc.data() });
          }
        }
      });

      this.articlesLoader = false;

      this.lastArticleSanpshot = this.Articles[this.Articles.length - 1];
    } catch (err) {
      this.articlesLoader = false;

      console.log(err);
    }
  }

  selectTag(tag: ITagEmit) {
    this.Articles = [];
    let tempTag = JSON.parse(JSON.stringify(tag.tag));
    delete tempTag.selected;
    if (tag.operationType === 'remove') {
      this.selectedTags.splice(
        this.selectedTags.findIndex((tag) => tag.lang === tempTag.lang),
        1
      );
    } else {
      this.selectedTags.push(tempTag);
    }

    this.getArticles();
  }

  selectCategory(category: string) {
    this.catergoryTitle = category;
    this.Articles = [];
    this.category = [category];
    this.getArticles();
  }

  searchbyTitle() {
    this.Articles = [];
    this.cleartags();
    this.getArticles();
  }

  cleartags() {
    this.selectedTags = [];
    this.tagsData = Tags.map((tag: Tag) => {
      return { ...tag, selected: false };
    });
  }

  async getProjectsfromBackup() {
    this.articlesLoader = true;

    try {
      let alterTags = this.selectedTags.map((tag: Tag) => {
        return tag.lang;
      });

      const filterString = JSON.stringify({
        alternativeTags: alterTags.length != 0 ? alterTags : null,
        category: this.category.length != 0 ? this.category : null,
        searchKeys:
          this.projectInput.length != 0
            ? this.projectInput.toLowerCase()
            : null,
        skip:
          this.lastbackupProjectSanpshot === (null)
            ? null
            : this.lastbackupProjectSanpshot.created_at,
      });
      const projects = await this.restAPIServiceService.GetDocsBySearch(
        'article',
        filterString
      );

      this.Articles = projects;

      this.lastbackupProjectSanpshot = this.Articles[this.Articles.length - 1];

      this.articlesLoader = false;
    } catch (err) {
      this.articlesLoader = false;
      console.log(err);
    }
  }
}
