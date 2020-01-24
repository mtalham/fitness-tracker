import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getActiveTraining, State} from './training-reducer/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  ongoingTraining = false;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.select(getActiveTraining).subscribe(res => this.ongoingTraining = !!res);
  }

}
