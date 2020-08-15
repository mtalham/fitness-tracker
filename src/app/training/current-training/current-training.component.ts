import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TrainingConfirmationComponent} from '../training-confirmation.component';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number;
  currentTraining: Exercise;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.currentTraining = this.trainingService.getCurrentTraining();
    this.stopOrResumeTimer();
  }

  stopOrResumeTimer() {
    const step = this.trainingService.getCurrentTraining().duration / 100 * 1000;
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
