import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ContestService } from 'app/entities/contest/service/contest.service';
import { ContestfieldService } from 'app/entities/contestfield/service/contestfield.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Checkbox } from '../checkbox';
import { IContestfield } from 'app/entities/contestfield/contestfield.model';
import { IContest } from 'app/entities/contest/contest.model';
import { DialogoverviewComponent } from '../dialogoverview/dialogoverview.component';
import { ContestformUpdateComponent } from 'app/entities/contestform/update/contestform-update.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @ViewChild(ContestformUpdateComponent) x!: ContestformUpdateComponent;

  con: any;

  @Input() textCheckbox!: Checkbox;

  @Input() index!: number;

  @Input() position = { x: 0, y: 0 };

  @Input() contestFieldID!: IContest | undefined;

  @Output() contestfieldLineDeleted = new EventEmitter<number>();

  arrayField = [{ name: '', type: '' }];

  fields!: FormGroup;

  settingsInput!: Checkbox;

  arrayResult: Checkbox[] = [];

  constructor(
    public dialog: MatDialog,
    protected contestService: ContestService,
    protected contestfieldService: ContestfieldService,
    protected sanitize: DomSanitizer
  ) {}

  placeholder!: String;
  type!: String;
  code!: String;
  contestfieldinput!: IContestfield;
  contestinput!: IContest | undefined;

  positionInput!: DOMRect;
  label!: String;

  ngOnInit(): void {
    this.label = 'قـم بإدخـال بيـان الحقـل';
  }

  ondragended(event: CdkDragMove): void {
    this.textCheckbox.positionInput = event.source.getRootElement().getBoundingClientRect();
    this.con = event.source.getRootElement().getBoundingClientRect().x;
    //console.log(event.source.element.nativeElement.innerHTML);
    console.log(this.sanitize.bypassSecurityTrustHtml);
  }
  ondragStarted(event: CdkDragStart): void {
    console.log('hello');
  }

  onclick(): void {
    this.arrayField.push({ name: 'MED', type: 'BADER' });
  }

  deleteContestfieldLine(): void {
    this.contestfieldLineDeleted.emit(this.index);
  }

  constraints(): void {
    const uPattern = '^[a-z0-9_-]{8,15}$';
    const aPattern = '^[0-9]{8,15}$';
    const cPattern = '[0-9]{8}';
    this.fields = new FormGroup({
      firstname: new FormControl('', [Validators.pattern(uPattern), Validators.required]),
      lastname: new FormControl('', [Validators.pattern(uPattern), Validators.required]),
      age: new FormControl('', [Validators.pattern(aPattern), Validators.required]),
      genre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern(aPattern), Validators.required]),
      cin: new FormControl('', [Validators.pattern(cPattern), Validators.required]),
      addresse: new FormControl('', [Validators.pattern(uPattern), Validators.required]),
      username: new FormControl('', [Validators.pattern(uPattern), Validators.required]),
      password: new FormControl('', [Validators.pattern(uPattern), Validators.required]),
    });
  }

  openDialog(event: any): void {
    // alert(event?.x);
    console.log(this.positionInput);
    if (!this.positionInput) {
      const a = new DOMRect(0, 200, 0, 0);
      this.positionInput = a;
    }
    if (!this.placeholder) {
      this.placeholder = 'قـم بإدخـال النّـص البديـل لهذا الحقـل...';
    }

    if (!this.label) {
      this.label = 'قـم بإدخـال بيـان الحقـل';
    }

    const dialogRef = this.dialog.open(DialogoverviewComponent, {
      data: {
        placeholder: this.placeholder,
        type: this.type,
        code: this.index,
        contestinput: this.contestFieldID,
        contestfieldinput: this.contestfieldinput,
        positionInput: this.positionInput,
        label: this.label,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.type = result;
      if (result?.label) {
        this.textCheckbox = result;
        console.log(result);
        document.getElementById(this.index.toString())!.style!.width = result.positionInput.width + 'px';
        document.getElementById(this.index.toString())!.style!.height = result.positionInput.height + 'px';
        this.placeholder = result.placeholder;
        this.label = result.label;
        this.arrayResult.push(result);
        console.log(this.arrayResult);
      }
    });
  }
}
