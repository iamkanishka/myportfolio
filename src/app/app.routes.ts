import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.routes').then((m) => m.PublicRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.AdminRoutingModule),
  },
];
