import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter();
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

}
