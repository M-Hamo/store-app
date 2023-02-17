import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  [x: string]: any;
}

export const appReducers: ActionReducerMap<IAppState> = {};

export const appEffects: Array<any> = [];
