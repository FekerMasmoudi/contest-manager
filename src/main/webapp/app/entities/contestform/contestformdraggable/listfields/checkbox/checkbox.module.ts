import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';

import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogoverviewComponent } from './dialogoverview/dialogoverview.component';
import { DialogoverviewModule } from './dialogoverview/dialogoverview.module';
import { MatFormFieldModule } from '@angular/material/form-field';

const MaterialComponents = [MatButtonModule, MatIconModule, MatButtonToggleModule, MatFormFieldModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialComponents, SharedModule, DragDropModule, DialogoverviewModule, DialogoverviewComponent, BrowserModule],

  exports: [MaterialComponents],
})
export class CheckboxModule {}
