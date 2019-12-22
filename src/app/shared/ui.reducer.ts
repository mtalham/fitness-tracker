export interface UIState {
  isLoading: boolean;
}

export enum UIAction {
  START_LOADING = 'START_LOADING',
  STOP_LOADING = 'STOP_LOADING',
}

const initialState: UIState = {
  isLoading: false,
};

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case UIAction.START_LOADING:
      return {isLoading: true};
    case UIAction.STOP_LOADING:
      return {isLoading: false};
    default:
      return state;
  }
}

export const getIsLoading = (state: UIState) => state.isLoading;
