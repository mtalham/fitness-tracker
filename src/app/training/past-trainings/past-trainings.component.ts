import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  exChangeSubs: Subscription;
  pastTrainings = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.fetchCompletedTrainings();
    this.exChangeSubs = this.trainingService.completedExercisesChanged.subscribe(exercises => this.pastTrainings.data = exercises);
  }

  ngAfterViewInit(): void {
    this.pastTrainings.sort = this.sort;
    this.pastTrainings.paginator = this.paginator;
  }

  search(value: string) {
    this.pastTrainings.filter = value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.exChangeSubs.unsubscribe();
  }
}
