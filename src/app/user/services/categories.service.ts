import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductVm } from 'src/app/admin/utils/interfaces/products.interface';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Endpoints } from 'src/app/core/utils/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public constructor(private readonly _connectionService: ConnectionService) {}

  private readonly endpoints: Endpoints = new Endpoints();

  public getCategories$: Observable<string[]> = this._connectionService.get(
    this.endpoints.categories.getCategories
  );

  public getCategoriesProducts = (
    categoryName: string
  ): Observable<IProductVm[]> =>
    this._connectionService.get(
      this.endpoints.categories.getCategoryProducts + categoryName
    );
}
