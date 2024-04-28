import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FirebaseDBModule } from '../firebase-db/firebase-db.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { ProjectsDataComponent } from './Components/projects-data/projects-data.component';
import { ArticlesDataComponent } from './Components/articles-data/articles-data.component';
import { AddOrEditProjectOrArticleComponent } from './Components/projects-data/add-or-edit-project-or-article/add-or-edit-project-or-article.component';
import { FirebaseDBService } from '../firebase-db/firebase-db.service';
import { HeaderComponent } from './Components/header/header.component';
import { SocialIconsModule } from '../Common/Components/social-icons/social-icons.module';
import { TagsModule } from '../Common/Components/tags/tags.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ProjectsDataComponent,
    ArticlesDataComponent,
    AddOrEditProjectOrArticleComponent,
    HeaderComponent,
    
  ],
  imports: [
    CommonModule,
    FirebaseDBModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SocialIconsModule,
    TagsModule,
    QuillModule.forRoot(
    //   {
    //   modules:{
    //     toolbar: [
    //       ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    //       [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
    
    //       [{ list: 'ordered' }, { list: 'bullet' }],
    //       [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    //       [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    //       [{ align: [] }],
    //       [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    
    //       ['link'], // link and image, video
    
    //       ['clean'], // remove formatting button
    //     ],
    //   }
    // }
  )
  ],
  providers:[FirebaseDBService]
}
)
export class AdminModule { }
