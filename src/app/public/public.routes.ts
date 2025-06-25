import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home').then((m) => m.Home),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./projects/projects').then((m) => m.Projects),
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./articles/articles').then((m) => m.Articles),
      },
      {
        path: 'aboute-me',
        loadComponent: () =>
          import('./about-me/about-me').then((m) => m.AboutMe),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
