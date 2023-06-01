import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FieldcontestformFormService, FieldcontestformFormGroup } from './fieldcontestform-form.service';
import { IFieldcontestform } from '../fieldcontestform.model';
import { FieldcontestformService } from '../service/fieldcontestform.service';
import { IContestform } from 'app/entities/contestform/contestform.model';
import { ContestformService } from 'app/entities/contestform/service/contestform.service';
import { etype } from 'app/entities/enumerations/etype.model';

@Component({
  selector: 'jhi-fieldcontestform-update',
  templateUrl: './fieldcontestform-update.component.html',
})
export class FieldcontestformUpdateComponent implements OnInit {
  isSaving = false;
  fieldcontestform: IFieldcontestform | null = null;
  etypeValues = Object.keys(etype);

  contestformsSharedCollection: IContestform[] = [];

  editForm: FieldcontestformFormGroup = this.fieldcontestformFormService.createFieldcontestformFormGroup();

  constructor(
    protected fieldcontestformService: FieldcontestformService,
    protected fieldcontestformFormService: FieldcontestformFormService,
    protected contestformService: ContestformService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareContestform = (o1: IContestform | null, o2: IContestform | null): boolean => this.contestformService.compareContestform(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldcontestform }) => {
      this.fieldcontestform = fieldcontestform;
      if (fieldcontestform) {
        this.updateForm(fieldcontestform);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fieldcontestform = this.fieldcontestformFormService.getFieldcontestform(this.editForm);
    if (fieldcontestform.id !== null) {
      this.subscribeToSaveResponse(this.fieldcontestformService.update(fieldcontestform));
    } else {
      this.subscribeToSaveResponse(this.fieldcontestformService.create(fieldcontestform));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldcontestform>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(fieldcontestform: IFieldcontestform): void {
    this.fieldcontestform = fieldcontestform;
    this.fieldcontestformFormService.resetForm(this.editForm, fieldcontestform);

    this.contestformsSharedCollection = this.contestformService.addContestformToCollectionIfMissing<IContestform>(
      this.contestformsSharedCollection,
      fieldcontestform.contestform
    );
  }

  protected loadRelationshipsOptions(): void {
    this.contestformService
      .query()
      .pipe(map((res: HttpResponse<IContestform[]>) => res.body ?? []))
      .pipe(
        map((contestforms: IContestform[]) =>
          this.contestformService.addContestformToCollectionIfMissing<IContestform>(contestforms, this.fieldcontestform?.contestform)
        )
      )
      .subscribe((contestforms: IContestform[]) => (this.contestformsSharedCollection = contestforms));
  }
}
