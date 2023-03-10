import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { IUserVm } from '../utils/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly _router: Router,
    private readonly _authServiceService: AuthServiceService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._authServiceService.user$.pipe(
      map((user: IUserVm | null) => {
        const isAuthenticated: boolean = !!user;

        !isAuthenticated && this._router.navigateByUrl('/');

        return isAuthenticated;
      })
    );
  }
}
