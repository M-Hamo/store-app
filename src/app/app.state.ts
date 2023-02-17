import { ActionReducerMap } from '@ngrx/store';

// import * as AdminDashboard from './admin/store/index';

export interface IAppState {
  // admin: AdminDashboard.AdminStates;
}

export const appReducers: ActionReducerMap<IAppState> = {
  // admin: AdminDashboard.adminReducer,
};

export const appEffects: Array<any> = [
  // AdminDashboard.AdminEffects
];
