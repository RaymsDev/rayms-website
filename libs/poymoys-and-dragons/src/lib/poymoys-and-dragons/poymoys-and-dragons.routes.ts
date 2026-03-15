import { Route } from '@angular/router';

export const POYMOYS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/campaign-home/campaign-home.component')
        .then(m => m.CampaignHomeComponent),
  },
  {
    path: 'scenario',
    loadComponent: () =>
      import('../pages/scenario/scenario.component')
        .then(m => m.ScenarioComponent),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import('../pages/character-sheet/character-sheet.component')
        .then(m => m.CharacterSheetComponent),
  },
];
