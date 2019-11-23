import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date = new Date();

  constructor() {
  }

  ngOnInit() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  handleSubmit(form: NgForm) {
    console.log(form.value);
  }
}
