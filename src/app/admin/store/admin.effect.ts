import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CategoriesService } from '../services/categories.service';
import {
  GetAllCategories,
  GetAllCategoriesFail,
  GetAllCategoriesSuccess,
} from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(
    private readonly _actions: Actions,
    private readonly _categoryService: CategoriesService
  ) {}

  public getCategoriesList$ = createEffect(() =>
    this._actions.pipe(
      ofType(GetAllCategories),
      switchMap(() =>
        this._categoryService.getCategories$.pipe(
          switchMap((res) =>
            of(GetAllCategoriesSuccess({ allCategories: res }))
          ),
          catchError(() => of(GetAllCategoriesFail()))
        )
      )
    )
  );
  // getCategoryProducts$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(GetCategoryProducts),
  //     switchMap((action) => {
  //       return this._category.GetCategoryProducts(action.categoryName).pipe(
  //         switchMap((products) =>
  //           of(GetCategoryProductsSuccess({ products: products }))
  //         ),
  //         catchError(() => of(GetCategoryProductsFail()))
  //       );
  //     })
  //   )
  // );
  // getProduct$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(GetCategory),
  //     switchMap((action) => {
  //       return this._category.GetCategory(action?.searchKeyword).pipe(
  //         switchMap((category) =>
  //           of(GetCategorySuccess({ category: category }))
  //         ),
  //         catchError(() => of(GetCategoryFail()))
  //       );
  //     })
  //   )
  // );
}
