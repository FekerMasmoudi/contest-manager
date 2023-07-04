import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modelinput } from '../modelinput';

@Component({
  selector: 'jhi-dialogoverview',
  templateUrl: './dialogoverview.component.html',
  styleUrls: ['./dialogoverview.component.scss'],
})
export class DialogoverviewComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogoverviewComponent>, @Inject(MAT_DIALOG_DATA) public data: Modelinput) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
