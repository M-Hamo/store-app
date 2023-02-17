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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public constructor(
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _snack: SnackBarService
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
    // this.loginSubmit = true;
    // this._identityManager
    //   .login({
    //     identifier: this.loginForm.value?.identifier as string,
    //     password: this.loginForm.value?.password as string,
    //     remember: this.loginForm.value?.remember as boolean,
    //   } as Login)
    //   .pipe(
    //     take(1),
    //     finalize(() => (this.loginSubmit = false))
    //   )
    //   .subscribe({
    //     next: (user: TokenResponse) =>
    //       this._router
    //         .navigateByUrl(
    //           user?.profile?.type === this.UserType.Administrator
    //             ? "/board"
    //             : "/board/orders/list"
    //         )
    //         .then(() => this._snack.snackbar("تم تسجيل الدخول بنجاح")),
    //     error: (err) =>
    //       this._handler.handle(err, {
    //         NotFound: (p, v) => `هذا الحساب "${v}" غير موجود.`,
    //       }),
    //   });
  };
}
