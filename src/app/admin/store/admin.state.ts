import { IProductVm } from '../utils/interfaces/products.interface';

export interface AdminStates {
  productsList: IProductVm[] | null;
  productDeletedSuccess: boolean | null;
  productUpdatedSuccess: boolean | null;
  productCreatedSuccess: boolean | null;
}

export const adminInitialState: AdminStates = {
  productsList: null,
  productDeletedSuccess: null,
  productUpdatedSuccess: null,
  productCreatedSuccess: null,
};
