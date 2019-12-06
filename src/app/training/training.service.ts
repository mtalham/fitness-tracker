import {Exercise} from './exercise.model';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  completedExercisesChanged = new Subject<Exercise[]>();

  availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private completedExercises: Exercise[] = [];
  //   = [
  //   {id: 'running', name: 'Running', duration: 30, calories: 80},
  //   {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
  //   {id: 'cycling', name: 'Cycling', duration: 20, calories: 30, state: 'completed'},
  //   {id: 'walking', name: 'Walking', duration: 60, calories: 40},
  // ];

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(response => response.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()[`name`],
            duration: doc.payload.doc.data()[`duration`],
            calories: doc.payload.doc.data()[`calories`],
          };
        })
      )).subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    });
  }

  startTraining(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getCurrentTraining() {
    return {...this.runningExercise};
  }

  fetchCompletedTrainings() {
    this.db.collection('completedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => this.completedExercisesChanged.next(exercises));
  }

  completeTraining() {
    this.addExerciseToFirestore({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelTraining(progress: number) {
    this.addExerciseToFirestore({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100)
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  private addExerciseToFirestore(exercise: Exercise) {
    this.db.collection('completedExercises').add(exercise).catch(err => console.log(err));
  }

}
