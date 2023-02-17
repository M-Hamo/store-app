import { createReducer, on } from '@ngrx/store';
import * as categoryActions from './admin.actions';
import { adminInitialState } from './admin.state';

export const adminReducer = createReducer(
  adminInitialState,
  on(categoryActions.GetAllCategoriesSuccess, (state, { allCategories }) => {
    return {
      ...state,
      categoryList: [...allCategories],
    };
  })
  // on(categoryActions.GetCategoryFail, (state) => {
  //   return {
  //     ...state,
  //     product: null,
  //   };
  // }),
  // on(categoryActions.GetCategoryProductsSuccess, (state, { products }) => {
  //   return {
  //     ...state,
  //     productsCategory: products,
  //   };
  // }),
  // on(categoryActions.GetCategoryProductsFail, (state) => {
  //   return {
  //     ...state,
  //     productsCategory: null,
  //   };
  // }),
  // on(categoryActions.GetCategoriesSuccess, (state, { categoryList }) => {
  //   return {
  //     ...state,
  //     categoryList: categoryList || null,
  //   };
  // }),
  // on(categoryActions.GetCategoryFail, (state) => {
  //   return {
  //     ...state,
  //     categoryList: null,
  //   };
  // }),
  // on(categoryActions.ResetToDefault, () => {
  //   return {
  //     categoryList: null,
  //     category: null,
  //     productsCategory : null
  //   };
  // })
);
