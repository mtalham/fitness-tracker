import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {UIService} from '../../shared/UI.service';
import {Store} from '@ngrx/store';
import {getAvailableTrainings, State} from '../training-reducer/training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  trainings: Observable<Exercise[]>;
  loading = false;
  loadingSub: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService, private store: Store<State>) {
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.trainings = this.store.select(getAvailableTrainings);
    this.loadingSub = this.uiService.loadingChange.subscribe(res => this.loading = res);
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
