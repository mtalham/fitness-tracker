import {uiReducer, UIState, getIsLoading} from './shared/ui.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  ui: UIState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer
};

export const getUiState = createFeatureSelector<UIState>('ui');
export const isLoading = createSelector(getUiState, getIsLoading);
