import { CanActivateFn } from '@angular/router';

export const logGuard: CanActivateFn = (route, state) => {
  return true;
};
