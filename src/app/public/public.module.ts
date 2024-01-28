import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { ProjectsComponent } from './Compoenents/projects/projects.component';
import { ProjectsdetailsComponent } from './Compoenents/projects/projectsdetails/projectsdetails.component';
import { HomeComponent } from './Compoenents/home/home.component';
import { AboutMeComponent } from './Compoenents/about-me/about-me.component';
import { HeaderComponent } from './Compoenents/header/header.component';
import { FirebaseDBModule } from '../firebase-db/firebase-db.module';
import { ArticlesComponent } from './Compoenents/articles/articles.component';
import { ArticlesDetailsComponent } from './Compoenents/articles/articles-details/articles-details.component';
import { FooterComponent } from './Compoenents/footer/footer.component';
import { TagsComponent } from '../Common/Components/tags/tags.component';


@NgModule({
  declarations: [
    PublicComponent,
    ProjectsComponent,
    ProjectsdetailsComponent,
    HomeComponent,
    AboutMeComponent,
    HeaderComponent,
    ArticlesComponent,
    ArticlesDetailsComponent,
    FooterComponent,
    TagsComponent

  ],
  imports: [
    CommonModule,
    FirebaseDBModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
