import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'expedition-33',
    loadComponent: () =>
      import('@rayms-website/invitations').then((m) => m.Expedition33),
  },
  {
    path: 'bibou-birthday',
    loadComponent: () =>
      import('@rayms-website/invitations').then((m) => m.BibouBirthday),
  },
  {
    path: 'poymoys-and-dragons',
    loadChildren: () =>
      import('@rayms-website/poymoys-and-dragons').then((m) => m.POYMOYS_ROUTES),
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
