import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { ProjectsComponent } from './Compoenents/projects/projects.component';
import { HomeComponent } from './Compoenents/home/home.component';
import { AboutMeComponent } from './Compoenents/about-me/about-me.component';
import { HeaderComponent } from './Compoenents/header/header.component';
import { FirebaseDBModule } from '../firebase-db/firebase-db.module';
import { ArticlesComponent } from './Compoenents/articles/articles.component';
import { FooterComponent } from './Compoenents/footer/footer.component';
import { TagsComponent } from '../Common/Components/tags/tags.component';
import { SocialIconsComponent } from '../Common/Components/social-icons/social-icons.component';
import { ProjectorArticleDetailPageComponent } from '../Common/Components/projector-article-detail-page/projector-article-detail-page.component';
import { ProjectorArticleCardComponent } from '../Common/Components/projector-article-card/projector-article-card.component';
import { noDataComponent } from '../Common/Components/no-data/no-data.component';
import { LoaderComponent } from '../Common/Components/loader/loader.component';

import { FormsModule  } from '@angular/forms';
import { SocialIconsModule } from '../Common/Components/social-icons/social-icons.module';

@NgModule({
  declarations: [
    PublicComponent,
    ProjectsComponent,
    HomeComponent,
    AboutMeComponent,
    HeaderComponent,
    ArticlesComponent,
    FooterComponent,
    TagsComponent,
    noDataComponent,
    ProjectorArticleDetailPageComponent,
    ProjectorArticleCardComponent,
    LoaderComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    FirebaseDBModule,
    PublicRoutingModule,
    SocialIconsModule
   
  ]
})
export class PublicModule { }
