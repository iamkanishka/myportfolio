import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './Compoenents/home/home.component';
import { ProjectsComponent } from './Compoenents/projects/projects.component';
import { AboutMeComponent } from './Compoenents/about-me/about-me.component';
import { ArticlesComponent } from './Compoenents/articles/articles.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: '',
    component: PublicComponent,
    children: [
      // { path: 'home', component: HomeComponent },
      // { path: 'articles', component: ArticlesComponent },
      // { path: 'projects', component: ProjectsComponent },
      // { path: 'aboutme', component: AboutMeComponent },
      
      ],
     
  },
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
