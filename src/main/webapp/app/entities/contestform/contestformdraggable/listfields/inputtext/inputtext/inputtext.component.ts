import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Modelinput } from '../modelinput';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoverviewComponent } from '../dialogoverview/dialogoverview.component';
import { IContestfield } from 'app/entities/contestfield/contestfield.model';
import { ContestformUpdateComponent } from 'app/entities/contestform/update/contestform-update.component';
import { ContestService } from 'app/entities/contest/service/contest.service';
import { ContestfieldService } from 'app/entities/contestfield/service/contestfield.service';
import { IContest } from 'app/entities/contest/contest.model';

@Component({
  selector: 'jhi-inputtext',
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.scss'],
})
export class InputtextComponent implements OnInit {
  @ViewChild(ContestformUpdateComponent) x!: ContestformUpdateComponent;

  con: any;
  @Input() textInput!: Modelinput;

  @Input() index!: number;

  @Input() position = { x: 0, y: 0 };

  @Input() contestFieldID!: IContest | undefined;

  @Output() contestfieldLineDeleted = new EventEmitter<number>();

  @Input() inputDrag!: CdkDragEnd;

  @Output() Eventdragend = new EventEmitter<CdkDragEnd>();

  arrayField = [{ name: '', type: '' }];

  fields!: FormGroup;

  settingsInput!: Modelinput;

  constructor(public dialog: MatDialog, protected contestService: ContestService, protected contestfieldService: ContestfieldService) {}

  name!: String;
  type!: String;
  code!: String;
  contestfieldinput!: IContestfield;
  contestinput!: IContest | undefined;

  ngOnInit(): void {}

  ondragended(event: CdkDragEnd): void {
    this.con = console.log(event.source.getRootElement().getBoundingClientRect());
  }

  ondragStarted(event: CdkDragStart): void {}

  onclick(): void {
    this.arrayField.push({ name: 'MED', type: 'BADER' });
  }

  deleteContestfieldLine(): void {
    this.contestfieldLineDeleted.emit(this.index);
  }

  openDialog(event: any): void {
    alert(this.con);
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
