import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectorArticle } from '../../../types/projectorarticle';
import { SocialIconsComponent } from '../social-icons/social-icons';
import { NgClass } from '@angular/common';
import { TagsComponent } from '../tags/tags';

@Component({
  selector: 'app-projector-article-detail-page',
  templateUrl: './projector-article-detail.html',
  imports: [SocialIconsComponent, NgClass, TagsComponent],

  styleUrl: './projector-article-detail.css',
})
export class ProjectorArticleDetailPage {
  @Input('ProjectorArticleDetails')
  ProjectorArticleDetails!: ProjectorArticle;

  @Input('show')
  show = false;

  @Output('close')
  onClose = new EventEmitter();

  tab: string = 'detail';

  ngOnInit(): void {
    //console.log(this.ProjectorArticleDetails);
  }

  ngOnChanges(): void {
    // console.log(this.ProjectorArticleDetails);
   }

  close() {
    // this.enableBodyScrolling()
    this.tab = 'detail';
    this.show = !this.show;
    this.onClose.emit();
  }

  copyIdToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = `https://kanishkanaik-b3089.web.app/projects?id=${String(
      this.ProjectorArticleDetails.uniqueId
    )}`;
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
