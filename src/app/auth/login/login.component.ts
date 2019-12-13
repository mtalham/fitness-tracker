import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {UIService} from '../../shared/UI.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {
  }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingChange.subscribe(res => this.loading = res);
  }

  handleSubmit(form: NgForm) {
    this.authService.loginUser(form.value);
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
