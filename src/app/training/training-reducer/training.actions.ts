import {createAction, props} from '@ngrx/store';
import {Exercise} from '../exercise.model';

export const ACTIVE_TRAINING = 'TOGGLE_TRAINING';
export const AVAILABLE_TRAININGS = 'AVAILABLE_TRAININGS';
export const COMPLETED_TRAININGS = 'COMPLETED_TRAININGS';

export const ActiveTraining = createAction(ACTIVE_TRAINING, props<{ payload: Exercise | null }>());
export const AvailableTrainings = createAction(AVAILABLE_TRAININGS, props<{ payload: Exercise[] }>());
export const CompletedTrainings = createAction(COMPLETED_TRAININGS, props<{ payload: Exercise[] }>());
