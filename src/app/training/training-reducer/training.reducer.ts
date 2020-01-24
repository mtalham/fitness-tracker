import {Exercise} from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {AvailableTrainings, CompletedTrainings, ActiveTraining} from './training.actions';

export interface TrainingState {
  availableTrainings: Exercise[];
  completedTrainings: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableTrainings: [],
  completedTrainings: [],
  activeTraining: null
};

const reducer = createReducer(
  initialState,
  on(AvailableTrainings, (state, {payload}) => ({...state, availableTrainings: payload})),
  on(CompletedTrainings, (state, {payload}) => ({...state, completedTrainings: payload})),
  on(ActiveTraining, (state, {payload}) => ({...state, activeTraining: payload}))
);

export function trainingReducer(state = initialState, action: Action) {
  return reducer(state, action);
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(getTrainingState, (state: TrainingState) => state.availableTrainings);
export const getCompletedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.completedTrainings);
export const getActiveTraining = createSelector(getTrainingState ,(state: TrainingState) => state.activeTraining);
