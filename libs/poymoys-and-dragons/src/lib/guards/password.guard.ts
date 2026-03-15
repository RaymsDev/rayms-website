import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const SESSION_KEY = 'pad_scenario_unlocked';
const SCENARIO_PASSWORD = 'Plopplop';

export const passwordGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (sessionStorage.getItem(SESSION_KEY) === 'true') {
    return true;
  }

  const input = window.prompt('Mot de passe requis :');
  if (input === SCENARIO_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return true;
  }

  router.navigate(['/poymoys-and-dragons']);
  return false;
};
