// import { Injectable } from "@angular/core";
// import { AuthStore } from "./auth.store";
// import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
// import { Observable, map } from "rxjs";

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor( private auth: AuthStore,
//                  private r: Router
//                ) {};

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
//         return this.auth.isLoggedIn$
//         .pipe(
//             map(loggedIn => 
//                 loggedIn? true: this.r.parseUrl('home'))
//         )
//     }

// }

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { map } from 'rxjs';

export const authGuard = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  return auth.isLoggedIn$.pipe(
    map(loggedIn => loggedIn ? true : router.parseUrl('home'))
  );
};