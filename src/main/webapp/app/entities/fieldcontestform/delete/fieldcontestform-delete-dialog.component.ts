import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFieldcontestform } from '../fieldcontestform.model';
import { FieldcontestformService } from '../service/fieldcontestform.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './fieldcontestform-delete-dialog.component.html',
})
export class FieldcontestformDeleteDialogComponent {
  fieldcontestform?: IFieldcontestform;

  constructor(protected fieldcontestformService: FieldcontestformService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.fieldcontestformService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
