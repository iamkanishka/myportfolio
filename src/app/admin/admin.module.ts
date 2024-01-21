import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FirebaseDBModule } from '../firebase-db/firebase-db.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Compoenents/login/login.component';
import { ProjectsDataComponent } from './Compoenents/projects-data/projects-data.component';
import { AddorEditProjectComponent } from './Compoenents/projects-data/addor-edit-project/addor-edit-project.component';
import { ArticlesDataComponent } from './Compoenents/articles-data/articles-data.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ProjectsDataComponent,
    AddorEditProjectComponent,
    ArticlesDataComponent
  ],
  imports: [
    CommonModule,
    FirebaseDBModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
