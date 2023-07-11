import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';

import { FormsModule } from '@angular/forms';

import { ListfieldsRoutingModule } from './listfields-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, ListfieldsRoutingModule],
})
export class ListfieldsModule {}
