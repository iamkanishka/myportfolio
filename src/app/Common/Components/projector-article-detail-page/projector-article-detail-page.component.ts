import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectorArticle } from '../../../Types/ProjectorArticle.type';

 
@Component({
  selector: 'app-projector-article-detail-page',
  templateUrl: './projector-article-detail-page.component.html',
  styleUrl: './projector-article-detail-page.component.css'
})
export class ProjectorArticleDetailPageComponent {

  @Input('ProjectorArticleDetails')
  ProjectorArticleDetails!: ProjectorArticle;

  @Input('show')
  show = false;

  @Output('close')
  onClose = new EventEmitter();

  ngOnInit(): void {}

  ngOnChanges(): void {}

  close() {
    // this.enableBodyScrolling()
    this.show = !this.show;
    this.onClose.emit();
  }

}
