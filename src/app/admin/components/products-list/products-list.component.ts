import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from '@shared/components/confirmation-dialog';
import { ParamsHelper } from '@shared/helpers/param-helper';
import { BreakpointObserverService } from '@shared/services/breakpoint-observer.service';
import { ButtonColors, ButtonTypes } from '@shared/utils/button-properties';
import {
  ModalHeight,
  ModalPercentageSize,
} from '@shared/utils/enum/modal-size-enum';
import { ToastrService } from 'ngx-toastr';
import {
  concatMap,
  debounceTime,
  filter,
  from,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { IAppState } from 'src/app/app.state';
import { DeleteProduct, GetAllProducts } from '../../store';
import { IProductVm } from '../../utils/interfaces/products.interface';
import {
  IProductPagination,
  QUERY,
} from '../../utils/models/product-pagination.model';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _confirmService: ConfirmationDialogService,
    private readonly _breakpointObserver: BreakpointObserverService,
    private readonly _toasterService: ToastrService,
    private readonly _translateService: TranslateService,
    private readonly _store: Store<IAppState>
  ) {}

  private readonly _unsubscribe$ = new Subject<unknown>();

  public search: FormControl<string | null> = this._fb.control(null);

  public tableConfig: IProductPagination = new IProductPagination();

  public productsLoaded: boolean = false;

  public productsList: IProductVm[] = [];

  public readonly ButtonTypes = ButtonTypes;

  public readonly ButtonColors = ButtonColors;

  public screenSize: string = '';

  public ngOnInit(): void {
    this._store.dispatch(GetAllProducts());
    this._screenSizeHandler();
    this._paramsChanges();
    this._searchChangeHandler();
  }

  public onOpenAddModal = (): void => {
    this._dialog.open(AddEditProductComponent, {
      width:
        this.screenSize === Breakpoints.Small ||
        this.screenSize === Breakpoints.XSmall
          ? ModalPercentageSize.FULL
          : ModalPercentageSize.MEDIUM,
      height: ModalHeight.X_LARGE,
      hasBackdrop: true,
      disableClose: true,
      closeOnNavigation: true,
      restoreFocus: false,
    });
  };

  public onOpenUploadModal = (prod: IProductVm): void => {
    this._dialog.open(AddEditProductComponent, {
      width:
        this.screenSize === Breakpoints.Small ||
        this.screenSize === Breakpoints.XSmall
          ? ModalPercentageSize.FULL
          : ModalPercentageSize.MEDIUM,
      height: ModalHeight.X_LARGE,
      hasBackdrop: true,
      disableClose: true,
      closeOnNavigation: true,
      restoreFocus: false,
      data: { prod },
    });
  };

  public onDeleteProduct = (prod: IProductVm): void => {
    this._confirmService
      .Confirm(
        `${
          this._translateService.instant('from') +
          ' ' +
          this._translateService.instant('delete')
        } (${prod.title.split('').slice(0, 40).join('')}...) ?`,
        this._translateService.instant('sure'),
        this._translateService.instant('delete')
      )
      .pipe(
        take(1),
        filter((val: boolean) => !!val),
        tap(() => this._store.dispatch(DeleteProduct({ prod }))),
        switchMap(() =>
          this._store.pipe(
            select((state: IAppState) => state.admin.productDeletedSuccess)
          )
        )
      )
      .subscribe({
        next: (res: boolean | null) => {
          if (typeof res === 'boolean') {
            res
              ? this._toasterService.success(
                  this._translateService.instant('deleteSuccess')
                )
              : this._toasterService.error(
                  this._translateService.instant('deleteFailed')
                );
          }
        },
      });
  };

  public onPageChange = (page: PageEvent): void => {
    from(
      this._router.navigate([], {
        queryParams: {
          [QUERY.INDEX]: page.pageIndex || null,
          [QUERY.SIZE]: page.pageSize || null,
        },
        queryParamsHandling: 'merge',
      })
    )
      .pipe(take(1))
      .subscribe();
  };

  private _searchChangeHandler = (): void => {
    this.search.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((val: any) =>
          from(
            this._router.navigate([], {
              queryParams: {
                [QUERY.SEARCH]: val || null,
              },
              queryParamsHandling: 'merge',
            })
          )
        ),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  };

  private _paramsChanges = (): void => {
    this._route.queryParamMap
      .pipe(
        tap((params: ParamMap) => {
          const queryParams = {
            index: ParamsHelper.indexPage(params, QUERY.INDEX),
            size: ParamsHelper.indexSize(params, QUERY.SIZE),
            search: ParamsHelper.search(params, QUERY.SEARCH) as string,
          };

          this.tableConfig = new IProductPagination({
            ...this.tableConfig,
            ...queryParams,
          });

          this.search.patchValue(queryParams?.search);
        }),
        switchMap(() => this._getProducts()),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  };

  private _getProducts = (): Observable<IProductVm[] | null> => {
    this.productsLoaded = false;
    const { index, size, search } = this.tableConfig;

    return this._store
      .pipe(select((state: IAppState) => state.admin.productsList))
      .pipe(
        tap((res: IProductVm[] | null) => {
          if (res?.length) {
            this.productsList = (
              search
                ? res.filter((prod) =>
                    prod?.title
                      ?.toLowerCase()
                      .includes(search?.toLowerCase() as string)
                  )
                : res
            )?.slice(
              index ? (index as number) * (size as number) : 0,
              index ? (index as number) * (size as number) + 10 : size
            );

            this.tableConfig.totalLength = res.length;

            this.productsLoaded = true;
          }
        })
      );
  };

  private _screenSizeHandler = (): void => {
    this._breakpointObserver.currentBreakpoint$
      .pipe(
        tap((val: string) => (this.screenSize = val)),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  };

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
