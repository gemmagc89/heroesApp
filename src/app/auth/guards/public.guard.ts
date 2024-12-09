import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, RouterStateSnapshot, Route, UrlSegment, Router, CanActivateFn, CanMatchFn } from "@angular/router";
// import { AuthGuard } from "./auth.guard";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

// option with functional programming
/*const chechAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if (isAuthenticated) {
            router.navigate(['./'])
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
}
export const canActivatePublicGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });

  return chechAuthStatus();
};

export const canMatchPublicGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return chechAuthStatus();
};*/

// option using a class
@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService, private router: Router) {}

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
          if (isAuthenticated) {
            this.router.navigate(['./'])
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }
}
