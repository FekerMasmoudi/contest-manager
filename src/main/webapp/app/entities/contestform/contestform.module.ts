import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContestformComponent } from './list/contestform.component';
import { ContestformDetailComponent } from './detail/contestform-detail.component';
import { ContestformUpdateComponent } from './update/contestform-update.component';
import { ContestformDeleteDialogComponent } from './delete/contestform-delete-dialog.component';
import { ContestformRoutingModule } from './route/contestform-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [SharedModule, ContestformRoutingModule,ReactiveFormsModule,FormsModule],
  declarations: [ContestformComponent, ContestformDetailComponent, ContestformUpdateComponent, ContestformDeleteDialogComponent],
})
export class ContestformModule {}
