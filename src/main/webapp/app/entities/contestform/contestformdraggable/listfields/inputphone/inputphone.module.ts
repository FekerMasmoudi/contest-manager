import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputphoneComponent } from './inputphone/inputphone.component';

import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogoverviewComponent } from './dialogoverview/dialogoverview.component';
import { DialogoverviewModule } from './dialogoverview/dialogoverview.module';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { TelinputComponent } from './telinput/telinput.component';
const MaterialComponents = [MatButtonModule, MatIconModule, MatButtonToggleModule, MatFormFieldModule];

@NgModule({
  declarations: [TelinputComponent],
  imports: [
    CommonModule,
    MaterialComponents,
    SharedModule,
    DragDropModule,
    FormsModule,
    DialogoverviewModule,
    DialogoverviewComponent,
    BrowserModule,
  ],

  exports: [MaterialComponents],
})
export class InputphoneModule {}
