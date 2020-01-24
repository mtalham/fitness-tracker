import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TrainingConfirmationComponent} from '../training-confirmation.component';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {Store} from '@ngrx/store';
import {getActiveTraining, State} from '../training-reducer/training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number;
  currentTraining: Exercise;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<State>) {
  }

  ngOnInit() {
    this.store.select(getActiveTraining).subscribe(res => this.currentTraining = res);
    this.stopOrResumeTimer();
  }

  stopOrResumeTimer() {
    const step = this.currentTraining.duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.trainingService.completeTraining();
      }
    }, step);
  }

  handleStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(TrainingConfirmationComponent, {
      data: {content: `You have already completed ${this.progress} %`}
    });

    dialogRef.afterClosed().subscribe(res => res ?
      this.trainingService.cancelTraining(this.progress) : this.stopOrResumeTimer());
  }
}
