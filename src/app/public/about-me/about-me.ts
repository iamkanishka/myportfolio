import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoData } from '../../common/components/no-data/no-data';
import { ProjectorArticleCard } from '../../common/components/project-article-card/project-article-card';

@Component({
  selector: 'app-about-me',
  imports: [ProjectorArticleCard, RouterLink, NoData],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  Projects: any[] = [];

  constructor() {
    window.scrollTo(0, 0);
  }

  showDetails(project: any) {}

  loadMore() {}
}
