import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Modelinput } from './inputtext/modelinput';
import { InputtextComponent } from './inputtext/inputtext/inputtext.component';
import { IContest } from 'app/entities/contest/contest.model';
import { Datepicker } from './datepicker/datepicker';
import { Checkbox } from './checkbox/checkbox';

declare function allowDrop(ev: any): any;
declare function drag(ev: any): any;
declare function drop(ev: any): boolean;
declare function removeNode(ev: any): any;

@Component({
  selector: 'jhi-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @ViewChild(InputtextComponent) y!: InputtextComponent;
  @Input() contfId!: IContest | undefined;

  arrayInput: Modelinput[] = [];

  arrayDatepicker: Datepicker[] = [];

  arrayCheckbox: Checkbox[] = [];

  //arrayFields = [{"name": "", "type" :""}];

  position: any;

  constructor() {}

  ngOnInit(): void {}

  addField(): void {
    const cinp: Modelinput = {
      name: 'text',
      type: 'text',
    };

    this.arrayInput.push(cinp);
    console.log(this.arrayInput);

    console.log(this.contfId);

    console.log(this.y.con);
  }

  onDragInput(event: CdkDragEnd): void {
    console.log(event.source.getRootElement().getBoundingClientRect);
  }
  addFieldDate(): void {
    const cdate: Datepicker = {
      name: 'mohamed',
      type: 'date',
    };

    this.arrayDatepicker.push(cdate);
    console.log(this.arrayDatepicker);
  }

  addFieldCheckbox(): void {
    const checkbox: Checkbox = {
      name: 'mohamed',
      type: 'checkbox',
    };

    this.arrayCheckbox.push(checkbox);
    console.log(this.arrayCheckbox);
  }

  deletehandlerInput(index: number): void {
    this.arrayInput.splice(index, 1);
  }

  deletehandlerDate(index: number): void {
    this.arrayDatepicker.splice(index, 1);
  }

  deletehandlerCheckbox(index: number): void {
    this.arrayCheckbox.splice(index, 1);
  }
  test(event: any): void {
    console.log(event);
  }
  ondragended1($event: CdkDragEnd): void {
    console.log($event.source.getRootElement().getBoundingClientRect());
  }
  ondragStarted(): void {
    console.log('hello');
  }
}
