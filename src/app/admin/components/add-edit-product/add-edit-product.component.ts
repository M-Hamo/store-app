import { Direction } from '@angular/cdk/bidi';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs/operators';
import { IAppState } from 'src/app/app.state';
import { BidirectionallyService } from 'src/app/core/services/bidirectionally.service';
import { CreateProduct, UpdateProduct } from '../../store';
import { IAddEditProductFormGroup } from '../../utils/interfaces/add-edit-product-form-group.interface';
import { IProductVm } from '../../utils/interfaces/products.interface';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  public constructor(
    private readonly _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      prod: IProductVm;
    },
    public readonly _dialogRef: MatDialogRef<AddEditProductComponent>,
    private readonly _toasterService: ToastrService,
    private readonly _direction: BidirectionallyService,
    private readonly _translateService: TranslateService,
    private readonly _store: Store<IAppState>
  ) {}

  public addEditProductForm: FormGroup<IAddEditProductFormGroup> =
    this._fb.group({
      title: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: Validators.required,
      }),
      price: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      category: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: Validators.required,
      }),
      description: new FormControl<string | null>(null, {
        nonNullable: true,
      }),
      image: new FormControl<string | null>(null, {
        nonNullable: true,
      }),
    });

  public readonly dir$ = this._direction.direction$;

  public submitLoading = false;

  public ngOnInit(): void {
    if (!!this.data?.prod) {
      this.addEditProductForm.patchValue({
        ...this.data?.prod,
        price: this.data?.prod?.price as any,
      });
    }
  }

  public onSubmit = (): void => {
    this.submitLoading = true;
    !!this.data?.prod ? this._updateProduct() : this._createNewProduct();
  };

  private _createNewProduct = (): void => {
    this._store.dispatch(
      CreateProduct({
        prod: {
          ...(this.addEditProductForm?.value as any),
        },
      })
    );

    this._store
      .pipe(select((state: IAppState) => state.admin.productCreatedSuccess))
      .subscribe({
        next: (res: boolean | null) => {
          if (typeof res === 'boolean') {
            res
              ? this._toasterService.success(
                  this._translateService.instant('createSuccess')
                )
              : this._toasterService.error(
                  this._translateService.instant('createFailed')
                );

            this.submitLoading = false;
            this.cancelHandler({});
          }
        },
      });
  };

  private _updateProduct = (): void => {
    this._store.dispatch(
      UpdateProduct({
        prod: {
          id: this.data?.prod?.id,
          ...(this.addEditProductForm?.value as any),
        },
      })
    );

    this._store
      .pipe(select((state: IAppState) => state.admin.productUpdatedSuccess))
      .subscribe({
        next: (res: boolean | null) => {
          if (typeof res === 'boolean') {
            res
              ? this._toasterService.success(
                  this._translateService.instant('updatedSuccess')
                )
              : this._toasterService.error(
                  this._translateService.instant('updatedFailed')
                );

            this.submitLoading = false;
            this.cancelHandler({});
          }
        },
      });
  };

  public cancelHandler = (res?: unknown): void =>
    this._dialogRef.close(res ?? null);
}
