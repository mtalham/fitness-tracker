import {uiReducer, UIState, getIsLoading} from './shared/ui.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {authReducer, AuthState, isAuthenticated, user} from './auth/auth.reducer';

export interface State {
  ui: UIState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer,
  auth: authReducer,
};

export const getUiState = createFeatureSelector<UIState>('ui');
export const isLoading = createSelector(getUiState, getIsLoading);

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getIsAuthenticated = createSelector(getAuthState, isAuthenticated);
export const getUser = createSelector(getAuthState, user);
