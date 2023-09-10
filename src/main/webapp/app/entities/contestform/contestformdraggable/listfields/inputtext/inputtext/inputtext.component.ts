import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragEnd, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';
import { Modelinput } from '../modelinput';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoverviewComponent } from '../dialogoverview/dialogoverview.component';
import { IContestfield } from 'app/entities/contestfield/contestfield.model';
import { ContestformUpdateComponent } from 'app/entities/contestform/update/contestform-update.component';
import { ContestService } from 'app/entities/contest/service/contest.service';
import { ContestfieldService } from 'app/entities/contestfield/service/contestfield.service';
import { IContest } from 'app/entities/contest/contest.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ContestformdraggableService } from '../../../service/contestformdraggable.service';

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

  uPattern = '^[a-z0-9_-]{8,15}$';

  fields: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.pattern(this.uPattern), Validators.required]),
  });

  settingsInput!: Modelinput;

  arrayResult: Modelinput[] = [];

  v1: any = '500px';
  v2: any = '500px';
  constructor(
    public dialog: MatDialog,
    protected contestService: ContestService,
    protected contestfieldService: ContestfieldService,
    protected sanitize: DomSanitizer,
    protected serviceDraggbale: ContestformdraggableService
  ) {}

  name!: String;
  placeholder!: String;
  type: String = 'text';
  code!: String;
  contestfieldinput!: IContestfield;
  contestinput!: IContest | undefined;

  positionInput!: DOMRect;
  label!: String;

  ngOnInit(): void {
    this.label = 'قـم بإدخـال بيـان الحقـل';
  }

  ondragended(event: CdkDragMove): void {
    if (this.textInput.positionInput?.right) this.textInput!!.positionInput = event.source.getRootElement().getBoundingClientRect();
    this.con = event.source.getRootElement().getBoundingClientRect().x;
    console.log(event.source.getRootElement().getBoundingClientRect().right);
    this.positionInput = event.source.getRootElement().getBoundingClientRect();
    //console.log(event.source.element.nativeElement);

    //console.log(this.sanitize.bypassSecurityTrustHtml(event.source.element.nativeElement.innerHTML));
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.target.innerWidth;
  }
  ondragStarted(event: CdkDragStart): void {}

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

  openDialog(): void {
    // alert(event?.x);

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
        name: this.name,
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
      if (result?.placeholder) {
        this.textInput = result;
        console.log(result);
        document.getElementById(this.index.toString())!.style!.width = result.positionInput.width + 'px';
        document.getElementById(this.index.toString())!.style!.height = result.positionInput.height + 'px';
        //document.getElementById(this.index.toString())!.style!.left =result.positionInput.left+"px";
        //document.getElementById(this.index.toString())!.style!.top =result.positionInput.top+"px";

        this.placeholder = result.placeholder;
        this.label = result.label;
        this.name = result.name;
        // this.arrayResult.push(result);
        this.serviceDraggbale.arrayFields.push(result);
        console.log(this.serviceDraggbale.arrayFields);
      }
    });
  }
}
