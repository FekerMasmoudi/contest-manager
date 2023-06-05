import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContest, NewContest } from '../contest.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContest for edit and NewContestFormGroupInput for create.
 */
type ContestFormGroupInput = IContest | PartialWithRequiredKeyOf<NewContest>;

type ContestFormDefaults = Pick<NewContest, 'id' | 'status'>;

type ContestFormGroupContent = {
  id: FormControl<IContest['id'] | NewContest['id']>;
  code: FormControl<IContest['code']>;
  rank: FormControl<IContest['rank']>;
  name: FormControl<IContest['name']>;
  parent: FormControl<IContest['parent']>;
  nbpositions: FormControl<IContest['nbpositions']>;
  status: FormControl<IContest['status']>;
  contestannounce: FormControl<IContest['contestannounce']>;
  grade: FormControl<IContest['grade']>;
  speciality: FormControl<IContest['speciality']>;
  sector: FormControl<IContest['sector']>;
};

export type ContestFormGroup = FormGroup<ContestFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContestFormService {
  createContestFormGroup(contest: ContestFormGroupInput = { id: null }): ContestFormGroup {
    const contestRawValue = {
      ...this.getFormDefaults(),
      ...contest,
    };
    return new FormGroup<ContestFormGroupContent>({
      id: new FormControl(
        { value: contestRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      code: new FormControl(contestRawValue.code, {
        validators: [Validators.required],
      }),
      rank: new FormControl(contestRawValue.rank, {
        validators: [Validators.required],
      }),
      name: new FormControl(contestRawValue.name, {
        validators: [Validators.required],
      }),
      parent: new FormControl(contestRawValue.parent, {}),
      nbpositions: new FormControl(contestRawValue.nbpositions, {
        validators: [Validators.required],
      }),
      status: new FormControl(contestRawValue.status),
      contestannounce: new FormControl(contestRawValue.contestannounce, {
        validators: [Validators.required],
      }),
      grade: new FormControl(contestRawValue.grade, {
        validators: [Validators.required],
      }),
      speciality: new FormControl(contestRawValue.speciality, {
        validators: [Validators.required],
      }),
      sector: new FormControl(contestRawValue.sector, {
        validators: [Validators.required],
      }),
    });
  }

  getContest(form: ContestFormGroup): IContest | NewContest {
    return form.getRawValue() as IContest | NewContest;
  }

  resetForm(form: ContestFormGroup, contest: ContestFormGroupInput): void {
    const contestRawValue = { ...this.getFormDefaults(), ...contest };
    form.reset(
      {
        ...contestRawValue,
        id: { value: contestRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContestFormDefaults {
    return {
      id: null,
      status: false,
    };
  }
}
