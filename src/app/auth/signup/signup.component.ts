import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {UIService} from '../../shared/UI.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date = new Date();
  loading = false;
  loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {
  }

  ngOnInit() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSub = this.uiService.loadingChange.subscribe(res => this.loading = res);
  }

  handleSubmit(form: NgForm) {
    this.authService.registerUser(form.value);
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
