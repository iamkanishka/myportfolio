import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectorArticle } from '../../../../Types/ProjectorArticle.type';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDBService } from '../../../../firebase-db/firebase-db.service';

@Component({
  selector: 'app-add-or-edit-project-or-article',
  templateUrl: './add-or-edit-project-or-article.component.html',
  styleUrl: './add-or-edit-project-or-article.component.css',
})
export class AddOrEditProjectOrArticleComponent {
  addProjectorArticlesForm: FormGroup;
  route: ActivatedRoute = Inject(ActivatedRoute);

  addOrEditType: string = '';

  addType: string = '';
  formData!: ProjectorArticle;

  @Output('close')
  onClose = new EventEmitter();

  responseToast = '';

  loader: Boolean = false;

  toastText: string = '';

  formKeys = {};

  constructor(
    private formBuilder: FormBuilder,
    private firebaseDB: FirebaseDBService,
    private router: Router
  ) {
    this.addOrEditType = String(window.location).includes('project')
      ? 'Project'
      : 'Article';

    if (this.addOrEditType === 'Project') {
      this.formKeys = {
        githubLink: ['', [Validators.required]],
        mediumLink: ['', []],
        linkedInLink: ['', []],
      };
    } else {
      this.formKeys = {
        githubLink: ['', []],
        mediumLink: ['', [Validators.required]],
        linkedInLink: ['', []],
      };
    }

    this.addProjectorArticlesForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
      ...this.formKeys,
      tags: ['', [Validators.required]],
    });

    //   this.formData = {
    //     "title": "asdcasdc",
    //     "description": "asdcasdcasdc",
    //     "imageURL": "asdcasdcasdc",
    //     "githubLink": "asdcasdc",
    //     "mediumLink": "asdcasdc",
    //     "linkedInLink": "asdcasdc",
    //     "tags": [
    //         "Angular",
    //         "Nodejs",
    //         "Nestjs"
    //     ]
    // }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (Object.keys(this.formData || {}).length != 0) {
      this.addProjectorArticlesForm.patchValue({
        title: this.formData.title,
        description: this.formData.description,
        imageURL: this.formData.imageURL,
        githubLink: this.formData.githubLink,
        mediumLink: this.formData.mediumLink,
        linkedInLink: this.formData.linkedInLink,
        tags: this.formData.tags,
      });
    }
  }

  async AddProject() {
    if (this.addProjectorArticlesForm.invalid) {
      this.toastText = 'Please Enter Valid Values';
      this.responseToast = 'error';
      return;
    }

    this.loader = true;
    try {
      this.loader = false;

      let formData = this.addProjectorArticlesForm.value;
      await this.firebaseDB.addDocument(
        this.addOrEditType.toLowerCase().concat('s'),
        formData
      );
      this.responseToast = 'success';
      this.addProjectorArticlesForm.reset;
      this.router.navigate(['/admin/project/list']);
    } catch (err) {
      this.toastText = 'Something went wrong';
      this.loader = false;

      this.responseToast = 'error';
      console.log(err);
    }
  }
}
