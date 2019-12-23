import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getIsAuthenticated, State} from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<State>) {
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(getIsAuthenticated);
  }

  logout() {
    this.authService.logout();
  }
}
