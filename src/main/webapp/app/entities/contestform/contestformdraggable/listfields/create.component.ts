import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InputtextComponent } from './inputtext/inputtext/inputtext.component';
import { Modelinput } from './inputtext/modelinput';

@Component({
  selector: 'jhi-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @ViewChild(InputtextComponent) y!: InputtextComponent;

  arrayInput: Modelinput[] = [];

  //arrayFields = [{"name": "", "type" :""}];

  position: any;

  constructor() {}

  ngOnInit(): void {}

  addField(): void {
    const cinp: Modelinput = {
      name: 'jjjg',
      type: 'text',
    };

    this.arrayInput.push(cinp);

    console.log(this.arrayInput);
  }

  deletehandlerInput(index: number): void {
    this.arrayInput.splice(index, 1);
  }

  ondragended(event: CdkDragEnd): void {}
}
