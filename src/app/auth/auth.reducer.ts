import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import {User} from './user.model';

export const TOGGLE_AUTHENTICATION = 'TOGGLE_AUTHENTICATION';

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const ToggleAuthentication = createAction(TOGGLE_AUTHENTICATION, props<{ payload: boolean }>());
export const InitializeUser = createAction('INIT_USER', props<{payload: User}>());

const reducer = createReducer(
  initialState,
  on(ToggleAuthentication, (state, {payload}) => ({...state, isAuthenticated: payload})),
  on(InitializeUser, (state, {payload}) => ({...state, user: payload})),
);

export function authReducer(state = initialState, action: Action) {
  return reducer(state, action);
}

export const isAuthenticated = (state: AuthState) => state.isAuthenticated;
export const user = (state: AuthState) => state.user;
