import { Component, Inject } from '@angular/core';
import { FirebaseDBService } from '../../../firebase-db/firebase-db.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';
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
  selector: 'app-articles-data',
  standalone: true,
  templateUrl: './articles-data.component.html',
  styleUrl: './articles-data.component.css',
})
export class ArticlesDataComponent {
  Articles: ProjectorArticle[] = [];
  selectedTags: Tag[] = [];
  tagsData: Tag[] = [];

  articlesLoader: boolean = false;

  category: String[] = [];

  catergoryTitle: String = 'All';

  categoryData: Icategory[] = [];
  projectInput: string = '';

  constructor(
    private firebaseDBService: FirebaseDBService,
    private router: Router
  ) {
    this.tagsData = Tags;
    this.category = ['All'];
    this.categoryData = projectCategories;
    this.getArticles();
  }

  async getArticles() {
    try {
      this.articlesLoader = true;
      const projects: any = await this.firebaseDBService.getAllDocuments(
        'articles',
        9,
        this.selectedTags.length != 0 ? this.selectedTags : null,
        this.category.length != 0 ? this.category : null,
       
      );
      projects.forEach((doc: any) => {
        if (
          this.selectedTags.length != 0 
        ) {
          if (this.category[0] === 'Important') {
            let projectData = { ...doc.data() };
            if (projectData.categories.includes('Important')) {
              this.Articles.push({ id: doc.id, ...doc.data() });
            }
          } else {
            this.Articles.push({ id: doc.id, ...doc.data() });
          }
        } else {
          this.Articles.push({ id: doc.id, ...doc.data() });
        }
      });

      this.articlesLoader = false;
      //  this.lastProjectSanpshot = this.Projects[this.Projects.length - 1];
    } catch (err) {
      this.articlesLoader = false;
      console.log(err);
    }
  }

  redirectTOEdit(article: ProjectorArticle) {
    let navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(article) },
      queryParamsHandling: 'merge',
    };

    // Navigate to the login page with extras
    this.router.navigate(['/admin/article/edit'], navigationExtras);
  }

  async DeleteArticles(id: string | undefined, index: number) {
    let Type = String(window.location).includes('project')
      ? 'projects'
      : 'articles';
    let text = 'Sure want to Cancel Article';
    if (confirm(text) == true) {
      const projects: any = await this.firebaseDBService.deleteDocumentId(
        String(id),
        Type
      );
      this.Articles.splice(index, 1);
    } else {
      text = 'You canceled!';
    }
  }

  selectTag(tag: ITagEmit) {
    this.Articles = [];
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
    this.getArticles();
  }

  selectCategory(category: String) {
    this.catergoryTitle = category;
    this.Articles = [];
    this.category = [category];
    this.getArticles();
  }
}
