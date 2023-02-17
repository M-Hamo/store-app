import { createAction, props } from '@ngrx/store';

export enum adminActionEnum {
  GET_ALL_CATEGORY = '[CATEGORY] GET ALL CATEGORY',
  GET_ALL_CATEGORY_SUCCESS = '[CATEGORY] GET ALL CATEGORY  SUCCESS',
  GET_ALL_CATEGORY_FAIL = '[CATEGORY] GET ALL CATEGORY FAIL',

  GET_CATEGORY_PRODUCTS = '[CATEGORY] GET CATEGORY PRODUCTS',
  GET_CATEGORY_PRODUCTS_SUCCESS = '[CATEGORY] GET CATEGORY PRODUCTS SUCCESS',
  GET_CATEGORY_PRODUCTS_FAIL = '[CATEGORY] GET CATEGORY PRODUCTS FAIL',

  GET_CATEGORIES = '[CATEGORY] GET CATEGORIES',
  GET_CATEGORIES_SUCCESS = '[CATEGORY] GET CATEGORIES  SUCCESS',
  GET_CATEGORIES_FAIL = '[CATEGORY] GET CATEGORIES FAIL',
}

export const GetAllCategories = createAction(adminActionEnum.GET_ALL_CATEGORY);

export const GetAllCategoriesSuccess = createAction(
  adminActionEnum.GET_ALL_CATEGORY_SUCCESS,
  props<{ allCategories: string[] }>()
);

export const GetAllCategoriesFail = createAction(
  adminActionEnum.GET_ALL_CATEGORY_FAIL
);
// //* GET CATEGORY  ACTIONS ENUM */
// export const GetCategoryProducts = createAction(
//   categoryActionEnum.GET_CATEGORY_PRODUCTS,
//   props<{ categoryName: string }>()
// );
// export const GetCategoryProductsSuccess = createAction(
//   categoryActionEnum.GET_CATEGORY_PRODUCTS_SUCCESS,
//   props<{ products: IGetProductsList[] }>()
// );
// export const GetCategoryProductsFail = createAction(
//   categoryActionEnum.GET_CATEGORY_PRODUCTS_FAIL
// );
// //* GET CATEGORIES ACTIONS ENUM */
// export const GetCategories = createAction(categoryActionEnum.GET_CATEGORIES);
// export const GetCategoriesSuccess = createAction(
//   categoryActionEnum.GET_CATEGORIES_SUCCESS,
//   props<{ categoryList: string[] }>()
// );
// export const GetCategoriesFail = createAction(
//   categoryActionEnum.GET_CATEGORIES_FAIL
// );
