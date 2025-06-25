import { Component, Input } from '@angular/core';
import { ProjectorArticle } from '../../../types/projectorarticle';
import { TagsComponent } from '../tags/tags';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-project-article-card',
  imports: [TagsComponent, SlicePipe],

  template: `
    <div
      class="rounded-lg h-auto w-full md:h-64 md:w-3/ overflow-hidden bg-white"
    >
      <img
        alt="content"
        class="object-cover object-center h-100 w-100"
        [src]="ProjectorArticleData.imageURL"
      />
    </div>
    <h2 class="text-xl font-medium title-font text-white mt-5">
      @if(ProjectorArticleData.title.length<=48){
      {{ ProjectorArticleData.title }}

      } @if(ProjectorArticleData.title.length>48){
      {{ ProjectorArticleData.title | slice : 0 : 48 }} ... }
    </h2>
    <span class="text-base leading-relaxed mt-2">
      {{ ProjectorArticleData.description | slice : 0 : 150 }}...
    </span>
    <a class="text-indigo-400 inline-flex items-center"
      >Learn More
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-4 h-4 ml-2"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </a>

    <app-tags
      [CustomOption]="{
        tagsData: ProjectorArticleData.tags!,
        disableShowMore: true,
        totalTagsVisible: 5,
        clickable: false
      }"
    ></app-tags>
  `,
  styles: '',
})
export class ProjectorArticleCard {
  @Input('ProjectorArticleData')
  ProjectorArticleData!: ProjectorArticle;
}
