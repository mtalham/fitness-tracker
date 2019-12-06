import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  trainings: Exercise[];
  exerciseSubs: Subscription;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exerciseSubs = this.trainingService.exercisesChanged.subscribe(res => this.trainings = res);
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubs.unsubscribe();
  }
}
