import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modelinput } from '../modelinput';
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
  constructor(public dialogRef: MatDialogRef<DialogoverviewComponent>, @Inject(MAT_DIALOG_DATA) public data: Modelinput) {}
  datacopy1!: Modelinput;
  domwidth: any = this.data.positionInput?.width;
  domheight: any = this.data.positionInput?.height;
  test: IContestfield[] = [];
  ngOnInit(): void {
    if (this.data?.contestinput?.contestfields) {
      for (let i = 0; i < this.data?.contestinput?.contestfields.length; i++) this.test[i] = this.data?.contestinput?.contestfields[i];
    }
    const datacopy: Modelinput = this.data;
    this.datacopy1 = datacopy;
    console.log(this.data.placeholder);
    //alert(this.data.positionInput?.x);
  }
  onNoClick(): void {
    this.data = this.datacopy1;
    this.dialogRef.close();
  }

  onChange(event: IContestfield): void {
    console.log(event.cname);
  }
  onChange1(event: any): void {
    this.data.positionInput!.width = this.domwidth;
    this.data.positionInput!.height = this.domheight;
  }
}
