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


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ProjectsDataComponent,
    
    ArticlesDataComponent,
    AddOrEditProjectOrArticleComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FirebaseDBModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers:[FirebaseDBService]
})
export class AdminModule { }
