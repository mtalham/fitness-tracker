import {START_LOADING, STOP_LOADING, UIActions} from './ui.actions';

export interface UIState {
  isLoading: boolean;
}

const initialState: UIState = {
  isLoading: false,
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {isLoading: true};
    case STOP_LOADING:
      return {isLoading: false};
    default:
      return state;
  }
}

export const getIsLoading = (state: UIState) => state.isLoading;
