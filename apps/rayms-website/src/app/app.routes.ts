import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'expedition-33',
    loadComponent: () =>
      import('@rayms-website/invitations').then((m) => m.Expedition33),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
