import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { CanActivateFn, CanMatchFn } from '@angular/router';

// import { CanActivate, CanMatch, GuardResult, MaybeAsync} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

// option with functional programming
const chechAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if (!isAuthenticated) {
            router.navigate(['./auth/login'])
          }
        })
      )
}
export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });

  return chechAuthStatus();
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return chechAuthStatus();
};

// option using a class
/*@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.chechAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.chechAuthStatus();
  }

  private chechAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['./auth/login'])
          }
        })
      )
  }
}*/
