import { ICategoryVm } from '../utils/interfaces/category.interface';

export interface AdminStates {
  categoryList: string[] | null;
  category: ICategoryVm | null;
  // productsCategory: IGetProductsList[] | null;
}

export const adminInitialState: AdminStates = {
  categoryList: null,
  category: null,
  // productsCategory: null,
};
