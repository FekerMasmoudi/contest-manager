import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputtextComponent } from './inputtext/inputtext/inputtext.component';

import { SharedModule } from 'app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create.component';

@NgModule({
  declarations: [CreateComponent, InputtextComponent],
  imports: [CommonModule, SharedModule],
})
export class ListfieldsModule {}
