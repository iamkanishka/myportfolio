import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectorArticle } from '../../../../Types/ProjectorArticle.type';


@Component({
  selector: 'app-articles-details',
  templateUrl: './articles-details.component.html',
  styleUrl: './articles-details.component.css'
})
export class ArticlesDetailsComponent {

  @Input('ArticletDetails')
  ArticletDetails!: ProjectorArticle;

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
