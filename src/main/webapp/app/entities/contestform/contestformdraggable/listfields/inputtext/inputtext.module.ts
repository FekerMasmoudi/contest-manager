import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputtextComponent } from './inputtext/inputtext.component';

import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { CreateComponent } from '../create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogoverviewComponent } from './dialogoverview/dialogoverview.component';
import { DialogoverviewModule } from './dialogoverview/dialogoverview.module';

const MaterialComponents = [MatButtonModule, MatIconModule, MatButtonToggleModule];

@NgModule({
  declarations: [DialogoverviewComponent],
  imports: [CommonModule, MaterialComponents, SharedModule, DragDropModule, DialogoverviewModule],

  exports: [MaterialComponents],
})
export class InputtextModule {}
