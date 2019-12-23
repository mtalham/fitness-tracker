import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {isLoading, State} from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<State>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(isLoading);
  }

  handleSubmit(form: NgForm) {
    this.authService.loginUser(form.value);
  }
}
