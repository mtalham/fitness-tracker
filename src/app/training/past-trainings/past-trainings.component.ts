import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {combineLatest, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {TrainingConfirmationComponent} from '../training-confirmation.component';
import {UIService} from '../../shared/UI.service';
import {Store} from '@ngrx/store';
import {getUser, State} from '../../app.reducer';
import {User} from '../../auth/user.model';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  pastTrainings = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state', 'action'];
  loading = false;
  private readonly subscriptions = new Subscription();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private dialog: MatDialog, private uiService: UIService,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.trainingService.fetchCompletedTrainings();
    this.subscriptions.add(
      combineLatest([this.trainingService.completedExercisesChanged, this.uiService.loadingChange, this.store.select(getUser)])
        .pipe(filter(r => !!r))
        .subscribe((r: [Exercise[], boolean, User]) => {
          this.loading = r[1];
          this.pastTrainings.data = r[0].filter(exercise => exercise.userId === r[2]?.userId);
        })
    );
  }

  ngAfterViewInit(): void {
    this.pastTrainings.sort = this.sort;
    this.pastTrainings.paginator = this.paginator;
  }

  search(value: string) {
    this.pastTrainings.filter = value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
