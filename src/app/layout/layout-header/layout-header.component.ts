import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/core/auth/auth-service.service';
import { IUserVm } from 'src/app/core/utils/user.model';

@Component({
  selector: 'layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent {
  public constructor(
    private readonly _authServiceService: AuthServiceService
  ) {}

  public readonly user$: Observable<IUserVm | null> =
    this._authServiceService.user$;

  public signOut = (): void => this._authServiceService.signOut();
}
