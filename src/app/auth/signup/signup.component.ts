import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {UIService} from '../../shared/UI.service';
import {Store} from '@ngrx/store';
import {isLoading, State} from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading$: Observable<boolean>;
  maxDate: Date = new Date();

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<State>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(isLoading)
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  handleSubmit(form: NgForm) {
    this.authService.registerUser(form.value);
  }
}
