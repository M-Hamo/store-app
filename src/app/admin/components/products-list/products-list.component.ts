import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IAppState } from 'src/app/app.state';
import { GetAllCategories } from '../../store';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  // public constructor(private readonly _store: Store<IAppState>) {}

  private readonly _unsubscribe$ = new Subject<unknown>();

  // public allCategories$: Observable<string[] | null> = this._store.pipe(
  //   select((state: IAppState) => state.admin.categoryList)
  // );

  public ngOnInit(): void {
    // this._store.dispatch(GetAllCategories());
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
