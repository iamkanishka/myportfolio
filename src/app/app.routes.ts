import { Routes } from '@angular/router';
import { HomeComponent } from './Compoenents/home/home.component';
import { ProjectsComponent } from './Compoenents/projects/projects.component';
import { BlogsComponent } from './Compoenents/blogs/blogs.component';
import { AboutMeComponent } from './Compoenents/about-me/about-me.component';
import { MasterComponent } from './master/master.component';
import { LoginComponent } from './Compoenents/admin/login/login.component';
import { ProjectsDataComponent } from './Compoenents/admin/projects-data/projects-data.component';
import { ArticlesDataComponent } from './Compoenents/admin/articles-data/articles-data.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: '',
    component: MasterComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'articles', component: BlogsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'aboutme', component: AboutMeComponent },
      {
        path: 'admin',
    
        children: [
          { path: 'crudProjectsandBlogs', component: LoginComponent },
          
          { path: 'projects', component: ProjectsDataComponent },
          { path: 'articles', component: ArticlesDataComponent },
        ],
      },
      ],
     
  },


  

];
