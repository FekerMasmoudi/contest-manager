import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ContestformdraggableService } from '../../service/contestformdraggable.service';

import { Dialogfinal } from './dialogfinal';

@Component({
  selector: 'jhi-dialogfinal',
  templateUrl: './dialogfinal.component.html',
  styleUrls: ['./dialogfinal.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, MatSelectModule],
})
export class DialogfinalComponent implements OnInit {
  //arrayFieldsInput = this.serviceDraggbale.arrayFields;

  dialogSafe!: SafeHtml;
  test: String[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogfinalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialogfinal,
    protected serviceDraggbale: ContestformdraggableService,
    public dom: DomSanitizer
  ) {}

  ngOnInit(): void {
    //if(this.data.htmlString)
    //this.dialogSafe = this.dom.bypassSecurityTrustHtml(this.data.htmlString);
    //this.test[0]=`<h1>mohamed</h1>`;
    //this.test[1]=`<h1>bader</h1>`;
    //alert(this.data.positionInput?.x);
  }
  public kaftagi(hrisa: string): SafeHtml {
    return this.dom.bypassSecurityTrustHtml(hrisa);
  }
  public showInnerHtml(html: SafeHtml): SafeHtml {
    if (this.data.htmlString) html = this.data.htmlString;
    console.log(this.dom.bypassSecurityTrustHtml(html.toString()));
    return this.dom.bypassSecurityTrustHtml(html.toString());
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
