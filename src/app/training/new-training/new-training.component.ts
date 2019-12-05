import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  trainings: Exercise[];
  selectedValue: string;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainings = this.trainingService.getAvailableExercises();
    this.selectedValue = this.trainings[0].name;
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.exercise.id);
  }
}
