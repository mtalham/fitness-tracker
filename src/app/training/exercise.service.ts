import {Exercise} from './exercise.model';

export class ExerciseService {
  availableExercises: Exercise[] = [
    {id: 'running', name: 'Running', duration: 30, calories: 80},
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'cycling', name: 'Cycling', duration: 20, calories: 30, state: 'completed'},
    {id: 'walking', name: 'Walking', duration: 40, calories: 40},
  ];

  getAvailableExercises() {
    return this.availableExercises;
  }
}
