import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UIService} from '../../shared/UI.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  trainings: Exercise[];
  exerciseSubs: Subscription;
  loading = false;
  loadingSub: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) {
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exerciseSubs = this.trainingService.exercisesChanged.subscribe(res => this.trainings = res);
    this.loadingSub = this.uiService.loadingChange.subscribe(res => this.loading = res);
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubs.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
