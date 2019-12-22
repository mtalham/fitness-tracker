import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
  <mat-dialog-content>{{data.content}}</mat-dialog-content>
  <mat-dialog-actions>
      <button mat-button color="warn" [mat-dialog-close]="true">Yes, Confirm</button>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
  </mat-dialog-actions>
  `
})
export class TrainingConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }
}
