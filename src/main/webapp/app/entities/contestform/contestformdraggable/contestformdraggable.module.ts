import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestformdraggableRoutingModule } from './contestformdraggable-routing.module';

import { SharedModule } from 'app/shared/shared.module';
import { ListfieldsComponent } from './listfields/listfields.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ContestformdraggableRoutingModule, SharedModule],
})
export class ContestformdraggableModule {}
