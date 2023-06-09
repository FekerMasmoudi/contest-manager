import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContestComponent } from './list/contest.component';
import { ContestDetailComponent } from './detail/contest-detail.component';
import { ContestUpdateComponent } from './update/contest-update.component';
import { ContestDeleteDialogComponent } from './delete/contest-delete-dialog.component';
import { ContestRoutingModule } from './route/contest-routing.module';

import { ContestfieldUpdateComponent } from '../contestfield/update/contestfield-update.component';

@NgModule({
  imports: [SharedModule, ContestRoutingModule],
  declarations: [
    ContestComponent,
    ContestDetailComponent,
    ContestUpdateComponent,
    ContestDeleteDialogComponent,
    ContestfieldUpdateComponent,
  ],
})
export class ContestModule {}
