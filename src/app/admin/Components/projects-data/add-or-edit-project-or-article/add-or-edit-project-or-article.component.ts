import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProjectorArticle } from '../../../../Types/ProjectorArticle.type';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDBService } from '../../../../firebase-db/firebase-db.service';
import {
  Tags,
  Tag,
  categories,
  Icategory,
} from '../../../../Common/Utilities/Data';
import { RestAPIServiceService } from '../../../../firebase-db/MongodbRESTAPIDB/rest-apiservice.service';

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

  categoriesData: Icategory[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private firebaseDB: FirebaseDBService,
    private router: Router,
    private route: ActivatedRoute,
    private restAPIServiceService: RestAPIServiceService
  ) {
    this.categoriesData = categories;
    this.TagsData = Tags;
    this.addOrEditType = String(window.location.pathname).includes('add')
      ? 'Add'
      : 'Edit';
    this.projectorArticleType = String(window.location.pathname).includes(
      'project'
    )
      ? 'Project'
      : 'Article';

    if (this.addOrEditType === 'Edit') {
      console.log(this.addOrEditType);

      this.route.queryParams.subscribe((params: any) => {
        console.log(params);

        this.formData = JSON.parse(params.data);
      });
    }

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
      created_at: [new Date(), [Validators.required]],
      updated_at: [new Date(), [Validators.required]],
      categories: [['All'], [Validators.required]],
      technologyUsed: ['', [Validators.required]],

      whatiLearnt: this.formBuilder.array([this.createWhatILearnt()]),
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
        whatiLearnt: this.formData.whatiLearnt,
        technologyUsed: this.formData.technologyUsed,

        isPinned: this.formData.isPinned,
      });
    }
  }

  createWhatILearnt(): FormGroup {
    return this.formBuilder.group({
      point: ['', Validators.required],
    });
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
      const uniqueId = new Date().getTime();

      let formData = this.addProjectorArticlesForm.value;

      formData['searchKeys'] = String(formData.title)
        .split(' ')
        .join('')
        .trim()
        .split('')
        .concat(
          String(
            String(formData.technologyUsed)
              .split(' ')
              .join('')
              .trim()
              .replace(',', '')
          ).split('')
        );

      formData['uniqueId'] = String(uniqueId);
      const addtoMongoDB = await this.restAPIServiceService.addDoc(
        this.projectorArticleType.toLowerCase(),
        formData
      );

      const addtofireDB = await this.firebaseDB.setDocument(
        this.projectorArticleType.toLowerCase().concat('s'),
        formData,
        String(uniqueId)
      );

      await Promise.all([addtofireDB, addtoMongoDB]);

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

      formData['searchKeys'] = String(formData.title)
        .split(' ')
        .join('')
        .trim()
        .split('')
        .concat(
          String(
            String(formData.technologyUsed)
              .split(' ')
              .join('')
              .trim()
              .replace(',', '')
          ).split('')
        );

      formData.updated_at = new Date();
      const updatetoMongoDB = this.restAPIServiceService.updateDoc(
        this.projectorArticleType.toLowerCase(),
        formData,
        this.formData.id!
      );

      const updatetofireDB = this.firebaseDB.updateDocumentId(
        String(this.formData.id),
        this.projectorArticleType.toLowerCase().concat('s'),
        formData
      );

      await Promise.all([updatetofireDB, updatetoMongoDB]);

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

  onAdd_Points() {
    this.pointsControls.push(this.createWhatILearnt());
  }

  onDelete_Points(index: number) {
    this.pointsControls.removeAt(index);
  }

  get pointsControls() {
    return this.addProjectorArticlesForm.get('whatiLearnt') as FormArray;
  }

  compareLang(t1: Tag, t2: Tag): boolean {
    return t1 && t2 ? t1.lang === t2.lang : t1 === t2;
  }

  getNumber(index: number): number {
    return index + 1;
  }
}
