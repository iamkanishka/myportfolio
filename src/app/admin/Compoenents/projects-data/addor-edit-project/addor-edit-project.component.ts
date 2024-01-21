import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-addor-edit-project',
  standalone: false,
  templateUrl: './addor-edit-project.component.html',
  styleUrl: './addor-edit-project.component.css'
})
export class AddorEditProjectComponent {

  
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
