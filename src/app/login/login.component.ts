import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonTypes, ButtonColors } from '../shared/utils/button-properties';
import { LoginFormGroup } from './login-interface.interface';
import { finalize, take } from 'rxjs/operators';
import { SnackBarService } from '../core/services/modal.service';
import { AuthServiceService } from '../core/auth/auth-service.service';
import { IUserVm, UserRole } from '../core/utils/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public constructor(
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _snack: SnackBarService,
    private readonly _authServiceService: AuthServiceService
  ) {}

  public loginForm: FormGroup<LoginFormGroup> = this._fb.group({
    userName: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  public readonly ButtonTypes = ButtonTypes;

  public readonly ButtonColors = ButtonColors;

  public loginSubmit = false;

  public onSubmitLogin = (): void => {
    this.loginSubmit = true;
    this._authServiceService
      .login({
        userName: this.loginForm.value?.userName as string,
        password: this.loginForm.value?.password as string,
      } as IUserVm)
      .pipe(
        take(1),
        finalize(() => (this.loginSubmit = false))
      )
      .subscribe({
        next: (res: { status: number; role: UserRole; message: string }) => {
          this._snack.snackbar(
            res?.message,
            res?.status === 200 ? 'success' : 'error'
          );

          if (res?.status === 200) {
            this._router.navigate([
              res?.role === UserRole.ADMIN
                ? '/store-app/dashboard'
                : '/store-app/products',
            ]);
          }
        },
      });
  };
}
