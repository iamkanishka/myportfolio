import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectorArticle } from '../../../../Types/ProjectorArticle.type';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDBService } from '../../../../firebase-db/firebase-db.service';
import { Tags, Tag } from '../../../../Common/Data';

@Component({
  selector: 'app-add-or-edit-project-or-article',
  templateUrl: './add-or-edit-project-or-article.component.html',
  styleUrl: './add-or-edit-project-or-article.component.css',
})
export class AddOrEditProjectOrArticleComponent {
  addProjectorArticlesForm: FormGroup;

  addOrEditType: string = '';
  projectorArticleType: string = '';

  addType: string = '';
  formData!: ProjectorArticle;

  @Output('close')
  onClose = new EventEmitter();

  responseToast = '';

  loader: Boolean = false;

  toastText: string = '';

  formKeys = {};

  TagsData: Tag[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private firebaseDB: FirebaseDBService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.TagsData = Tags;
    this.addOrEditType = String(window.location.pathname).includes('add')
      ? 'Add'
      : 'Edit';
    this.projectorArticleType = String(window.location.pathname).includes('project')
      ? 'Project'
      : 'Article';

      console.log(this.addOrEditType);


    if (this.addOrEditType === 'Edit') {
      console.log(this.addOrEditType);
      
      this.route.queryParams.subscribe((params: any) => {
        console.log(params);
        
        this.formData = JSON.parse(params.data);
      });
    }

    console.log(this.formData);

    if (this.projectorArticleType === 'Project') {
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
        this.projectorArticleType.toLowerCase().concat('s'),
        formData
      );
      this.responseToast = 'success';
      this.addProjectorArticlesForm.reset;
      this.router.navigate([
        `/admin/${this.projectorArticleType.toLowerCase()}/list`,
      ]);
    } catch (err) {
      this.toastText = 'Something went wrong';
      this.loader = false;

      this.responseToast = 'error';
      console.log(err);
    }
  }

  async UpdateProject() {
    if (this.addProjectorArticlesForm.invalid) {
      this.toastText = 'Please Enter Valid Values';
      this.responseToast = 'error';
      return;
    }

    this.loader = true;
    try {
      this.loader = false;

      let formData = this.addProjectorArticlesForm.value;
      await this.firebaseDB.updateDocumentId(
        String(this.formData.id),
        this.projectorArticleType.toLowerCase().concat('s'),
        formData
      );
      this.responseToast = 'success';
      this.addProjectorArticlesForm.reset;
      this.router.navigate([
        `/admin/${this.projectorArticleType.toLowerCase()}/list`,
      ]);
    } catch (err) {
      this.toastText = 'Something went wrong';
      this.loader = false;

      this.responseToast = 'error';
      console.log(err);
    }
  }
}
