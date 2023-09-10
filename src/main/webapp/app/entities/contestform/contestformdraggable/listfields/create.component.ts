import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Modelinput } from './inputtext/modelinput';
import { InputtextComponent } from './inputtext/inputtext/inputtext.component';
import { IContest } from 'app/entities/contest/contest.model';
import { Datepicker } from './datepicker/datepicker';
import { Checkbox } from './checkbox/checkbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Emailinput } from './emailinput/emailinput';
import { Passwordinput } from './passwordinput/passwordinput';
import { Inputtextarea } from './inputtextarea/inputtextarea';
import { Inputphone } from './inputphone/inputphone';
import { CheckboxComponent } from './checkbox/checkbox/checkbox.component';
import { EmailinputComponent } from './emailinput/emailinput/emailinput.component';
import { DatepickerComponent } from './datepicker/datepicker/datepicker.component';
import { ContestformService } from '../../service/contestform.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DialogfinalComponent } from './dialogfinal/dialogfinal.component';
import { MatDialog } from '@angular/material/dialog';
import { ContestformdraggableService } from '../service/contestformdraggable.service';

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
  @ViewChild(CheckboxComponent) z!: CheckboxComponent;
  @ViewChild(EmailinputComponent) x!: EmailinputComponent;
  @ViewChild(DatepickerComponent) d!: DatepickerComponent;
  @Input() contfId!: IContest | undefined;

  arrayInput: Modelinput[] = [];

  arrayDatepicker: Datepicker[] = [];

  arrayCheckbox: Checkbox[] = [];

  arrayEmailinput: Emailinput[] = [];

  arrayPasswordinput: Passwordinput[] = [];

  arrayInputtextarea: Inputtextarea[] = [];

  arrayInputphone: Inputphone[] = [];

  codeFinal: SafeHtml = '';

  arrayFields: String[] = [];

  type: any;

  htmlString!: string;
  htmlStrings: string[] = [];

  //arrayFields = [{"name": "", "type" :""}];

  fields!: FormGroup;

  position: any;

  constructor(
    protected contestformService: ContestformService,
    protected sanitize: DomSanitizer,
    protected dialog: MatDialog,
    protected serviceDraggbale: ContestformdraggableService
  ) {}

  ngOnInit(): void {}

  addField(): void {
    const a = new DOMRect(0, 200, 0, 0);
    const cinp: Modelinput = {
      name: '',
      placeholder: 'قـم بإدخـال النّـص البديـل لهذا الحقـل...',
      type: 'text',
      code: null,
      contestinput: this.contfId,
      contestfieldinput: null,
      positionInput: a,
      label: '',
    };

    this.arrayInput.push(cinp);
    //console.log(this.arrayInput);

    console.log(this.contfId);

    //console.log(this.y.con);
  }

  onDragInput(event: CdkDragEnd): void {
    console.log(event.source.getRootElement().getBoundingClientRect());
  }
  addFieldDate(): void {
    const a = new DOMRect(0, 200, 0, 0);
    const cdate: Datepicker = {
      placeholder: '',
      type: 'datepicker',
      code: null,
      contestinput: null,
      contestfieldinput: null,
      positionInput: a,
      label: '',
    };

    this.arrayDatepicker.push(cdate);
    console.log(this.arrayDatepicker);
  }

  addFieldCheckbox(): void {
    const a = new DOMRect(0, 200, 0, 0);
    const checkbox: Checkbox = {
      placeholder: 'قـم بإدخـال النّـص البديـل لهذا الحقـل...',
      type: this.type,
      code: null,
      contestinput: this.contfId,
      contestfieldinput: null,
      positionInput: a,
      label: '',
    };

    this.arrayCheckbox.push(checkbox);
    //console.log(this.arrayCheckbox);
  }

  addFieldEmailinput(): void {
    const a = new DOMRect(0, 200, 0, 0);
    const emailinput: Emailinput = {
      placeholder: 'قـم بإدخـال النّـص البديـل لهذا الحقـل...',
      type: this.type,
      code: null,
      contestinput: this.contfId,
      contestfieldinput: null,
      positionInput: a,
      label: '',
    };

    this.arrayEmailinput.push(emailinput);
    //console.log(this.arrayEmailinput);
  }

  addFieldPasswordinput(): void {
    const a = new DOMRect(0, 200, 0, 0);
    const passwordinput: Passwordinput = {
      placeholder: 'قـم بإدخـال النّـص البديـل لهذا الحقـل...',
      type: this.type,
      code: null,
      contestinput: this.contfId,
      contestfieldinput: null,
      positionInput: a,
      label: '',
    };

    this.arrayPasswordinput.push(passwordinput);
    //console.log(this.arrayEmailinput);
  }

  addFieldTextarea(): void {
    const a = new DOMRect(0, 200, 0, 0);
    const cinparea: Inputtextarea = {
      placeholder: 'قـم بإدخـال النّـص البديـل لهذا الحقـل...',
      type: this.type,
      code: null,
      contestinput: this.contfId,
      contestfieldinput: null,
      positionInput: a,
      label: '',
    };

    this.arrayInputtextarea.push(cinparea);
    //console.log(this.arrayInput);

    console.log(this.contfId);

    //console.log(this.y.con);
  }

  addFieldInputphone(): void {
    const a = new DOMRect(0, 200, 0, 0);
    const cinpphone: Inputphone = {
      placeholder: 'قـم بإدخـال النّـص البديـل لهذا الحقـل...',
      type: this.type,
      code: null,
      contestinput: this.contfId,
      contestfieldinput: null,
      positionInput: a,
      label: '',
    };

    this.arrayInputphone.push(cinpphone);
    //console.log(this.arrayInput);

    console.log(this.contfId);

    //console.log(this.y.con);
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
  deletehandlerEmailinput(index: number): void {
    this.arrayEmailinput.splice(index, 1);
  }
  deletehandlerPasswordinput(index: number): void {
    this.arrayPasswordinput.splice(index, 1);
  }
  deletehandlerInputtextarea(index: number): void {
    this.arrayInputtextarea.splice(index, 1);
  }
  deletehandlerInputphone(index: number): void {
    this.arrayInputphone.splice(index, 1);
  }

  saveTest1(event: any): void {
    event = this.y.ondragended(event.source.element.nativeElement);
  }

  saveHTML(): void {
    for (let i = 0; i < this.serviceDraggbale.arrayFields.length; i++) {
      switch ((this.serviceDraggbale.arrayFields[i].type = 'text')) {
        case 'text': {
          this.htmlString =
            `<mat-form-field id =` +
            this.y.index +
            ` >
    	<mat-label >` +
            this.serviceDraggbale.arrayFields[i].label +
            `</mat-label>
    	<input matInput  width="` +
            this.serviceDraggbale.arrayFields[i].positionInput?.width +
            `" height="` +
            this.serviceDraggbale.arrayFields[i].positionInput?.height +
            `" name="` +
            this.serviceDraggbale.arrayFields[i].name +
            `"
    	id="test" type="text" placeholder="` +
            this.serviceDraggbale.arrayFields[i].placeholder +
            `" />
  		</mat-form-field>`;

          //this.arrayFields.push(this.htmlString);
          alert('لقـد تـم حفـظ الحقـول وقتـيا بنجـاح');
          //console.log(this.arrayFields);

          this.htmlStrings[i] = this.htmlString;

          break;
        }
      }
    }
    this.htmlString = '';
    for (let j = 0; j < this.htmlStrings.length; j++) {
      this.htmlString = this.htmlString + this.htmlStrings[j];
      console.log(this.htmlStrings[j]);
    }
  }

  showDialog(): void {
    const dialogRef = this.dialog.open(DialogfinalComponent, {
      data: {
        htmlString: this.htmlString,
      },
    });
  }

  ondragended1($event: any): void {
    //console.log($event.source.getRootElement().getBoundingClientRect());
    //console.log($event.source.element.nativeElement);
  }
  ondragStarted(): void {
    //console.log('hello');
    //console.log($event.source.element.nativeElement);
  }
}
