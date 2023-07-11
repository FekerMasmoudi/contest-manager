import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Checkbox } from '../checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { IContest } from 'app/entities/contest/contest.model';
import { IContestfield } from 'app/entities/contestfield/contestfield.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'jhi-dialogoverview',
  templateUrl: './dialogoverview.component.html',
  styleUrls: ['./dialogoverview.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, MatSelectModule],
})
export class DialogoverviewComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogoverviewComponent>, @Inject(MAT_DIALOG_DATA) public data: Checkbox) {}
  test: IContestfield[] = [];
  ngOnInit(): void {
    if (this.data?.contestinput?.contestfields) {
      for (let i = 0; i < this.data?.contestinput?.contestfields.length; i++) this.test[i] = this.data?.contestinput?.contestfields[i];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
