import {Action, createAction, createReducer, on, props} from '@ngrx/store';

export const TOGGLE_AUTHENTICATION = 'TOGGLE_AUTHENTICATION';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const ToggleAuthentication = createAction(TOGGLE_AUTHENTICATION, props<{ payload: boolean }>());

const reducer = createReducer(
  initialState,
  on(ToggleAuthentication, (state, {payload}) => ({isAuthenticated: payload}))
);

export function authReducer(state = initialState, action: Action) {
  return reducer(state, action);
}

export const isAuthenticated = (state: AuthState) => state.isAuthenticated;
