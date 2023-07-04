import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Modelinput } from '../modelinput';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoverviewComponent } from '../dialogoverview/dialogoverview.component';

@Component({
  selector: 'jhi-inputtext',
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.scss'],
})
export class InputtextComponent implements OnInit {
  @Input() textInput!: Modelinput;

  @Input() index!: number;

  @Input() position = { x: 0, y: 0 };

  @Output() contestfieldLineDeleted = new EventEmitter<number>();

  arrayField = [{ name: '', type: '' }];

  fields!: FormGroup;

  settingsInput!: Modelinput;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ondragended(event: CdkDragEnd): void {}
  ondragStarted(event: CdkDragStart): void {
    console.log('hello');
  }

  onclick(): void {
    this.arrayField.push({ name: 'jkkk', type: 'hjhgg' });
  }

  deleteContestfieldLine(): void {
    this.contestfieldLineDeleted.emit(this.index);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoverviewComponent, {
      data: { name: this.settingsInput.name, type: this.settingsInput.type },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.settingsInput.type = result;
    });
  }
}
