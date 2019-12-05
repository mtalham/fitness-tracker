import {Exercise} from './exercise.model';
import {Subject} from 'rxjs';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  availableExercises: Exercise[] = [
    {id: 'running', name: 'Running', duration: 30, calories: 80},
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'cycling', name: 'Cycling', duration: 20, calories: 30, state: 'completed'},
    {id: 'walking', name: 'Walking', duration: 60, calories: 40},
  ];

  private runningExercise: Exercise;
  private completedExercises: Exercise[] = [];

  getAvailableExercises = () => this.availableExercises.slice();

  startTraining(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getCurrentTraining() {
    return {...this.runningExercise};
  }

  getCompletedTrainings() {
    return this.completedExercises.slice();
  }

  completeTraining() {
    this.completedExercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelTraining(progress: number) {
    this.completedExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100)
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

}
