
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { filter, map } from 'rxjs';

export const authGuard = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  return auth.isLoggedIn$.pipe(
    map(loggedIn => loggedIn ? true : router.parseUrl('home'))
  );
};

export const canActivateUserGuard = () => {
    const auth = inject(AuthStore);
    const router = inject(Router);
  
    return router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const usernameFromUrl = router.url.split('/')[2]; // Get the username from the URL after navigation has ended
        console.log(usernameFromUrl)
        return auth.user$['u_username'] === usernameFromUrl ? true : router.parseUrl('home');
      })
    );
  };

  export const verifyUserGuard = () => {
    const auth = inject(AuthStore);
    const router = inject(Router);
    
  
    return auth.user$.pipe(
      map(user => {
        const usernameFromUrl = router.url.split('/')[2]; // assuming the username is the second segment of the URL
        console.log(usernameFromUrl)
        if (user['u_username'] === usernameFromUrl) {
            return true;
        } else {
            return router.parseUrl('login');
        }
      })
    );
  };
  