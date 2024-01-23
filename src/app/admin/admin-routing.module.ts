import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './Compoenents/login/login.component';
import { ProjectsDataComponent } from './Compoenents/projects-data/projects-data.component';
import { ArticlesDataComponent } from './Compoenents/articles-data/articles-data.component';
import { AddOrEditProjectOrArticleComponent } from './Compoenents/projects-data/add-or-edit-project-or-article/add-or-edit-project-or-article.component';
import { authGuard } from './Guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin',
        children: [
          { path: 'crudProjectsandBlogs', component: LoginComponent },
          { path: 'project',   
          //  canActivate: [authGuard],
              children:[
            { path: 'list', component: ProjectsDataComponent}, 
            { path: 'add', component: AddOrEditProjectOrArticleComponent}, 
            { path: 'edit', component: AddOrEditProjectOrArticleComponent}, 
            
           ]
        },
          { path: 'article',
          // canActivate: [authGuard],
             children:[
            { path: 'list', component: ArticlesDataComponent}, 
            { path: 'add', component: AddOrEditProjectOrArticleComponent}, 
            { path: 'edit', component: AddOrEditProjectOrArticleComponent}, 
            
           ]
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
