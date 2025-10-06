import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'expedition-33',
    loadComponent: () =>
      import('@rayms-website/invitations').then((m) => m.Expedition33),
  },
];
