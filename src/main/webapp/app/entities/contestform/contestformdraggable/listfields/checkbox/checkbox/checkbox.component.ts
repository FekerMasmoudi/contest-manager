import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ContestService } from 'app/entities/contest/service/contest.service';
import { ContestfieldService } from 'app/entities/contestfield/service/contestfield.service';
import { FormGroup } from '@angular/forms';
import { Checkbox } from '../checkbox';
import { IContestfield } from 'app/entities/contestfield/contestfield.model';
import { IContest } from 'app/entities/contest/contest.model';
import { DialogoverviewComponent } from '../dialogoverview/dialogoverview.component';

@Component({
  selector: 'jhi-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() textCheckbox!: Checkbox;

  @Input() index!: number;

  @Input() position = { x: 0, y: 0 };

  @Input() contestFieldID!: IContest | undefined;

  @Output() contestfieldLineDeleted = new EventEmitter<number>();

  arrayField = [{ name: '', type: '' }];

  fields!: FormGroup;

  settingsInput!: Checkbox;

  constructor(public dialog: MatDialog, protected contestService: ContestService, protected contestfieldService: ContestfieldService) {}

  name!: String;
  type!: String;
  code!: String;
  contestfieldinput!: IContestfield;
  contestinput!: IContest | undefined;

  ngOnInit(): void {}

  ondragended(event: CdkDragEnd): void {}
  ondragStarted(event: CdkDragStart): void {
    console.log('hello');
  }

  onclick(): void {
    this.arrayField.push({ name: 'MED', type: 'BADER' });
  }

  deleteContestfieldLine(): void {
    this.contestfieldLineDeleted.emit(this.index);
  }

  openDialog(event: any): void {
    const dialogRef = this.dialog.open(DialogoverviewComponent, {
      data: {
        name: this.name,
        type: this.type,
        code: this.index,
        contestinput: this.contestFieldID,
        contestfieldinput: this.contestfieldinput,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.type = result;
    });
  }
}
