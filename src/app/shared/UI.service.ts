import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UIService {
  loadingChange = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackbar(message: string, action = null, duration = 4000) {
    this.snackbar.open(message, action, {duration});
  }
}
