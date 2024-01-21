import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { ProjectsComponent } from './Compoenents/projects/projects.component';
import { ProjectsdetailsComponent } from './Compoenents/projects/projectsdetails/projectsdetails.component';
import { HomeComponent } from './Compoenents/home/home.component';
import { AboutMeComponent } from './Compoenents/about-me/about-me.component';
import { BlogsComponent } from './Compoenents/blogs/blogs.component';
import { HeaderComponent } from './Compoenents/header/header.component';
import { FirebaseDBModule } from '../firebase-db/firebase-db.module';


@NgModule({
  declarations: [
    PublicComponent,
    ProjectsComponent,
    ProjectsdetailsComponent,
    HomeComponent,
    AboutMeComponent,
    BlogsComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    FirebaseDBModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
