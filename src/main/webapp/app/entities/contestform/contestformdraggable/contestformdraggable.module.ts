import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestformdraggableRoutingModule } from './contestformdraggable-routing.module';

import { CreateComponent } from './listfields/create.component';

import { SharedModule } from 'app/shared/shared.module';
import { ContestformdraggableComponent } from './contestformdraggable/contestformdraggable.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ContestformdraggableRoutingModule, SharedModule],
})
export class ContestformdraggableModule {}
