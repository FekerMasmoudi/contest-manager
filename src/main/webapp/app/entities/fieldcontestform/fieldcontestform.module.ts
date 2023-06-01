import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FieldcontestformComponent } from './list/fieldcontestform.component';
import { FieldcontestformDetailComponent } from './detail/fieldcontestform-detail.component';
import { FieldcontestformUpdateComponent } from './update/fieldcontestform-update.component';
import { FieldcontestformDeleteDialogComponent } from './delete/fieldcontestform-delete-dialog.component';
import { FieldcontestformRoutingModule } from './route/fieldcontestform-routing.module';

@NgModule({
  imports: [SharedModule, FieldcontestformRoutingModule],
  declarations: [
    FieldcontestformComponent,
    FieldcontestformDetailComponent,
    FieldcontestformUpdateComponent,
    FieldcontestformDeleteDialogComponent,
  ],
})
export class FieldcontestformModule {}
