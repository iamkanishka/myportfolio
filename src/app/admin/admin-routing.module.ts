import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './Compoenents/login/login.component';
import { ProjectsDataComponent } from './Compoenents/projects-data/projects-data.component';
import { ArticlesDataComponent } from './Compoenents/articles-data/articles-data.component';

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
          { path: 'projects', component: ProjectsDataComponent },
          { path: 'articles', component: ArticlesDataComponent },
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
