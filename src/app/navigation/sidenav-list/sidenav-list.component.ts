import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe(res => this.isAuth = res);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
