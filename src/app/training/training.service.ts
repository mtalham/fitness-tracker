import {Exercise} from './exercise.model';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {UIService} from '../shared/UI.service';
import {Store} from '@ngrx/store';
import {getUser, State} from '../app.reducer';
import {User} from '../auth/user.model';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  completedExercisesChanged = new Subject<Exercise[]>();
  private user: User;
  private fbSubs: Subscription[] = [];

  availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<State>) {
    this.fbSubs.push(this.store.select(getUser).subscribe(u => {
      this.user = u;
    }));
  }

  fetchAvailableExercises() {
    this.uiService.loadingChange.next(true);
    this.fbSubs.push(this.db.collection('availableExercises')
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
        this.uiService.loadingChange.next(false);
      }, error => {
        this.uiService.loadingChange.next(false);
        this.uiService.showSnackbar('Failed to fetch exercises, try again later');
      }));
  }

  startTraining(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getCurrentTraining() {
    return {...this.runningExercise};
  }

  fetchCompletedTrainings() {
    this.fbSubs.push(this.db.collection('completedExercises')
      .snapshotChanges()
      .pipe(map(response => response.map(doc => {
          return {
            // @ts-ignore
            ...doc.payload.doc.data(),
            id: doc.payload.doc.id,
          };
        })
      )).subscribe((exercises: Exercise[]) => {
          const e = exercises.filter(ex => ex.userId === this.user.userId);
          this.completedExercisesChanged.next(e);
        }
      ));
  }

  completeTraining() {
    this.addExerciseToFirestore({...this.runningExercise, date: new Date(), state: 'completed', userId: this.user.userId});
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

  deleteExercise(docId: string) {
    this.db.collection('completedExercises').doc(docId).delete()
      .then(() => this.fetchCompletedTrainings())
      .catch(e => console.log(e));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addExerciseToFirestore(exercise: Exercise) {
    this.db.collection('completedExercises').add(exercise).catch(err => console.log(err));
  }

}
