import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {TrainingConfirmationComponent} from '../training-confirmation.component';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  exChangeSubs: Subscription;
  pastTrainings = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state', 'action'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private dialog: MatDialog) {
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

  deleteTraining(training: Exercise) {
    const dialogRef = this.dialog.open(TrainingConfirmationComponent, {
      data: {
        content: `Training '${training.name}' will be deleted permanently`
      }
    });

    dialogRef.afterClosed().subscribe(res => res && this.trainingService.deleteExercise(training.id));
  }
}
