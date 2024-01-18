import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-projectsdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projectsdetails.component.html',
  styleUrl: './projectsdetails.component.css'
})
export class ProjectsdetailsComponent {

  @Input('ProjectId')
  ProjectId: string | undefined = undefined;

  @Input('show')
  show = false;

  @Output('close')
  onClose = new EventEmitter()
  disableBodyScrolling() {
    document.body.style.setProperty('overflow', 'hidden')
  }

  enableBodyScrolling() {
    document.body.style.setProperty('overflow', 'scroll')
  }

  ngOnInit(): void {
    this.init()
  }

  ngOnChanges(): void {
    this.init()
  }

  init() {
    // if (this.show)
    //   this.disableBodyScrolling()
  }

  close() {
   // this.enableBodyScrolling()
   this.show =  !this.show
   this.onClose.emit()
 
  }

}
