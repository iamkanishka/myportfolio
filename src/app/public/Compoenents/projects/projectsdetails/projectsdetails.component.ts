import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectorArticle } from '../../../../Types/ProjectorArticle.type';

@Component({
  selector: 'app-projectsdetails',

  templateUrl: './projectsdetails.component.html',
  styleUrl: './projectsdetails.component.css',
})
export class ProjectsdetailsComponent {
  @Input('ProjectDetails')
  ProjectDetails!: ProjectorArticle;

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
