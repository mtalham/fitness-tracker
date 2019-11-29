import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExerciseService} from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  @Output() startTraining = new EventEmitter();
  trainings: string[];
  selectedValue: string;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.trainings = this.exerciseService.getAvailableExercises().map(it => it.name);
    this.selectedValue = this.trainings[0];
  }

}
