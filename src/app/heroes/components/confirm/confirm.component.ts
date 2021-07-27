import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [],
})
export class ConfirmComponent implements OnInit {
  constructor(private _dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero ) {}

  ngOnInit(): void {

  }

  delete() {
    this._dialogRef.close(true);
  }

  close() {
    this._dialogRef.close();
  }
}
