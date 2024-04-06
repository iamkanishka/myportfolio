import { Component } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
import { Tags, Tag, articleCategories, Icategory } from '../../../Common/Utilities/Data';
import { FormControl } from '@angular/forms';
import { debounce } from 'rxjs';

interface ITagEmit {
  tag: Tag;
  operationType: 'remove' | 'add';
}
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  isshowDetails: boolean = false;
  articleDetailsData!: ProjectorArticle;

  Articles: ProjectorArticle[] = [];
  tagsData: Tag[] = [];

  lastArticleSanpshot!: ProjectorArticle;

  articlesLoader: Boolean = false;
  selectedTags: Tag[] = [];

  category:String[] = []
  categoryData:Icategory[] = []



  catergoryTitle:String = 'Important'

  articleInput:string = ''

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





  async getArticles() {
    try {
      this.articlesLoader = true;

      const articles: any = await this.firebaseDBService.getAllDocuments(
        'articles',
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.category
      );

      articles.forEach((doc: any) => {

        
        if(  this.category[0]==='Important'){
          let articletData = {...doc.data()};
         
          if (this.articleInput!=="" ? (articletData.title.includes(this.articleInput) && articletData.category.includes('Important') ) :articletData.category.includes('Important'))   {
            this.Articles.push({ id: doc.id, ...doc.data() });

          }
        }else{
          this.Articles.push({ id: doc.id, ...doc.data() });

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
      const articles: any = await this.firebaseDBService.paginateLoadMore(
        'articles',
        this.lastArticleSanpshot,
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null
      );
      articles.forEach((doc: any) => {
      
        
        if(  this.category[0]==='Important'){
          let articletData = {...doc.data()};
          if (this.articleInput!=="" ? (articletData.title.includes(this.articleInput) && articletData.category.includes('Important') ) :articletData.category.includes('Important'))   {
          
          this.Articles.push({ id: doc.id, ...doc.data() });

          }
        }else{
          this.Articles.push({ id: doc.id, ...doc.data() });

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


  
  selectCategory(category:String){
    this.catergoryTitle = category;
     this.Articles = [];
    this.category = [category]
    this.getArticles();
 
   }


   
  searchbyTitle(){
    this.Articles = [];
    this.getArticles();
  }


}
