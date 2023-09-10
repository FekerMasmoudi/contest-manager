import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContestformComponent } from './list/contestform.component';
import { ContestformDetailComponent } from './detail/contestform-detail.component';
import { ContestformUpdateComponent } from './update/contestform-update.component';
import { ContestformDeleteDialogComponent } from './delete/contestform-delete-dialog.component';
import { ContestformRoutingModule } from './route/contestform-routing.module';
import { FormsModule } from '@angular/forms';

import { ContestformdraggableComponent } from './contestformdraggable/contestformdraggable/contestformdraggable.component';
import { ListfieldsComponent } from './contestformdraggable/listfields/listfields.component';
import { CreateComponent } from './contestformdraggable/listfields/create.component';
import { InputtextComponent } from './contestformdraggable/listfields/inputtext/inputtext/inputtext.component';
import { DatepickerComponent } from './contestformdraggable/listfields/datepicker/datepicker/datepicker.component';
import { CheckboxComponent } from './contestformdraggable/listfields/checkbox/checkbox/checkbox.component';
import { EmailinputComponent } from './contestformdraggable/listfields/emailinput/emailinput/emailinput.component';

import { PasswordinputComponent } from './contestformdraggable/listfields/passwordinput/passwordinput/passwordinput.component';
import { InputtextareaComponent } from './contestformdraggable/listfields/inputtextarea/inputtextarea/inputtextarea.component';
import { InputphoneComponent } from './contestformdraggable/listfields/inputphone/inputphone/inputphone.component';

@NgModule({
  imports: [SharedModule, ContestformRoutingModule, FormsModule],
  declarations: [
    ContestformComponent,
    ContestformDetailComponent,
    ContestformUpdateComponent,
    ContestformDeleteDialogComponent,
    ContestformdraggableComponent,
    ListfieldsComponent,
    InputtextComponent,
    CreateComponent,
    DatepickerComponent,
    CheckboxComponent,
    EmailinputComponent,
    PasswordinputComponent,
    InputtextareaComponent,
    InputphoneComponent,
  ],
})
export class ContestformModule {}
