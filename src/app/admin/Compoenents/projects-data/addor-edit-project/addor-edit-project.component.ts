import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectorArticle } from '../../../../Types/ProjectorArticle.type';

@Component({
  selector: 'app-addor-edit-project',
  templateUrl: './addor-edit-project.component.html',
  styleUrl: './addor-edit-project.component.css',
})
export class AddorEditProjectComponent {
  addProjectorArticlesForm: FormGroup;

  @Input('show')
  show = false;

  @Input('addType')
  addType = '';

  @Input('formData')
  formData!: ProjectorArticle;

  @Output('close')
  onClose = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.addProjectorArticlesForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
      githubLink: ['', [Validators.required]],
      mediumLink: ['', [Validators.required]],
      linkedInLink: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (Object.keys(this.formData).length != 0) {
      this.addProjectorArticlesForm.patchValue({
        title:this.formData.title,
        description:this.formData.description,
        imageURL:this.formData.imageURL,
        githubLink:this.formData.githubLink,
        mediumLink:this.formData.mediumLink,
        linkedInLink:this.formData.linkedInLink,


        
      })
    }
  }

  close() {
    this.show = !this.show;
    this.onClose.emit();
  }

  AddProject() {}

  // disableBodyScrolling() {
  //   document.body.style.setProperty('overflow', 'hidden')
  // }

  // enableBodyScrolling() {
  //   document.body.style.setProperty('overflow', 'scroll')
  // }
}
