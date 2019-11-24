import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fitness-tracker';
  openSidenav = false;

  toggleSidenav() {
    this.openSidenav = !this.openSidenav;
  }
}
