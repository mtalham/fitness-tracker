import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  pastTrainings = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.pastTrainings.data = this.trainingService.getCompletedTrainings();
  }

  ngAfterViewInit(): void {
    this.pastTrainings.sort = this.sort;
  }

}
