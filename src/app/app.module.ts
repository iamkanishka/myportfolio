import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { ProjectorArticleCardComponent } from './Common/Components/projector-article-card/projector-article-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectorArticleCardComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    PublicModule,
    AppRoutingModule,

  ],
  providers: [
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
