import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadComponent: () => import('./auth/auth').then((m) => m.AuthComponent),
      },
      {
        path: 'projects',
        canActivate: [authGuard],
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./project-article-list/project-article-list').then(
                (m) => m.ProjectArticleList
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./project-article-form/project-article-form').then(
                (m) => m.ProjectArticleForm
              ),
          },
          {
            path: 'edit',
            loadComponent: () =>
              import('./project-article-form/project-article-form').then(
                (m) => m.ProjectArticleForm
              ),
          },
        ],
      },
      {
        path: 'articles',
        canActivate: [authGuard],
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./project-article-list/project-article-list').then(
                (m) => m.ProjectArticleList
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./project-article-form/project-article-form').then(
                (m) => m.ProjectArticleForm
              ),
          },
          {
            path: 'edit',
            loadComponent: () =>
              import('./project-article-form/project-article-form').then(
                (m) => m.ProjectArticleForm
              ),
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
