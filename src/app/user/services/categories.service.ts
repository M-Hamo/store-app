import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Endpoints } from 'src/app/core/utils/endpoints';
import { IProductVm } from '../../admin/utils/interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public constructor(private readonly _connectionService: ConnectionService) {}

  private readonly endpoints: Endpoints = new Endpoints();

  public getCategories$: Observable<string[]> = this._connectionService.get(
    this.endpoints.dashboard.getCategories
  );

  public allProducts$: Observable<IProductVm[]> = this._connectionService.get(
    this.endpoints.dashboard.getAllProducts
  );

  // public GetCategoryProducts(
  //   categoryName: string
  // ): Observable<IGetProductsList[]> {
  //   const url = new URL(`${this.serverUrl}products/category/${categoryName}`);
  //   return this._http.get<IGetProductsList[]>(url.toString());
  // }

  // public GetCategory(searchKeyword: string): Observable<IGetCategories> {
  //   const url = new URL(`${this.serverUrl}products/category/${searchKeyword}`);
  //   return this._http.get<IGetCategories>(url.toString());
  // }
}
