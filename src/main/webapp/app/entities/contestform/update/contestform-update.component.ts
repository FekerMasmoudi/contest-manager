import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ContestformFormService, ContestformFormGroup } from './contestform-form.service';
import { IContestform } from '../contestform.model';
import { ContestformService } from '../service/contestform.service';
import { IContest } from 'app/entities/contest/contest.model';
import { ContestService } from 'app/entities/contest/service/contest.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IContestfield } from 'app/entities/contestfield/contestfield.model';
import { ContestfieldService } from 'app/entities/contestfield/service/contestfield.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContestformdraggableComponent } from '../contestformdraggable/contestformdraggable/contestformdraggable.component';
import { InputtextComponent } from '../contestformdraggable/listfields/inputtext/inputtext/inputtext.component';

@Component({
  selector: 'jhi-contestform-update',
  templateUrl: './contestform-update.component.html',
})
export class ContestformUpdateComponent implements OnInit {
  isSaving = false;
  contestform: IContestform | null = null;

  contestsSharedCollection: IContest[] = [];

  // Add list of contestfields
  @ViewChild(ContestformdraggableComponent) t!: ContestformdraggableComponent;

  contestfields: IContestfield[] = [];

  usersSharedCollection: IUser[] = [];
  code: any[] = [];
  arrayField: FormGroup[] = [];
  editForm: ContestformFormGroup = this.contestformFormService.createContestformFormGroup();
  contest: IContest[] = [];

  fieldobj: any;
  conobj!: IContest;
  fields!: FormGroup;
  propField!: FormGroup;
  listobject: any[] = [
    { id: '1', type: 'TEXT' },
    { id: '2', type: 'DATE' },
    { id: '3', type: 'IMAGE' },
    { id: '4', type: 'FILE' },
    { id: '5', type: 'NUMBER' },
    { id: '6', type: 'CHECKBOX' },
    { id: '7', type: 'RADIOBOX' },
    { id: '8', type: 'SUBMIT' },
    { id: '9', type: 'TEL' },
    { id: '10', type: 'PASSWORD' },
    { id: '11', type: 'EMAIL' },
  ];

  contestfield: IContestfield[] | null | undefined;

  constructor(
    protected contestformService: ContestformService,
    protected contestformFormService: ContestformFormService,
    protected contestService: ContestService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected contestfieldService: ContestfieldService,
    protected formbuilder: FormBuilder
  ) {}

  compareContest = (o1: IContest | null, o2: IContest | null): boolean => this.contestService.compareContest(o1, o2);

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contestform }) => {
      this.contestform = contestform;
      if (contestform) {
        this.updateForm(contestform);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contestform = this.contestformFormService.getContestform(this.editForm);
    if (contestform.id !== null) {
      this.subscribeToSaveResponse(this.contestformService.update(contestform));
    } else {
      this.subscribeToSaveResponse(this.contestformService.create(contestform));
    }
  }

  /* OnChangeField(): void {
    if (this.fieldobj != null && this.fieldobj != undefined) {
      this.propField = this.formbuilder.group({
        name: this.fieldobj,
        type: '',
        start: '',
        end: '',
      });
      this.arrayField.push(this.propField);
      console.log(this.fieldobj);
    }
  }*/
  OnChange(): void {
    //let contest:IContest= this.contest.value;

    /*   for (let i = 0; i < this.contestsSharedCollection.length; i++) {
      if (this.contestsSharedCollection[i].id == this.conobj) this.contestfield = this.contestsSharedCollection[i].contestfields;
    }*/
    console.log(this.conobj);

    //this.fields.addControl('fname', new FormControl('', Validators.required));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContestform>>): void {
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

  protected updateForm(contestform: IContestform): void {
    this.contestform = contestform;
    this.contestformFormService.resetForm(this.editForm, contestform);

    this.contestsSharedCollection = this.contestService.addContestToCollectionIfMissing<IContest>(
      this.contestsSharedCollection,
      contestform.contest
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, contestform.user);
  }

  protected loadRelationshipsOptions(): void {
    this.contestService
      .query()
      .pipe(map((res: HttpResponse<IContest[]>) => res.body ?? []))
      .pipe(
        map((contests: IContest[]) => this.contestService.addContestToCollectionIfMissing<IContest>(contests, this.contestform?.contest))
      )
      .subscribe((contests: IContest[]) => (this.contestsSharedCollection = contests));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.contestform?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
