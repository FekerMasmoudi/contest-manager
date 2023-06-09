import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContestfield, NewContestfield } from '../contestfield.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContestfield for edit and NewContestfieldFormGroupInput for create.
 */
type ContestfieldFormGroupInput = IContestfield | PartialWithRequiredKeyOf<NewContestfield>;

type ContestfieldFormDefaults = Pick<NewContestfield, 'id' | 'mandatory'>;

type ContestfieldFormGroupContent = {
  id: FormControl<IContestfield['id'] | NewContestfield['id']>;
  mandatory: FormControl<IContestfield['mandatory']>;
  reference: FormControl<IContestfield['reference']>;
  ctype: FormControl<IContestfield['ctype']>;
  cname: FormControl<IContestfield['cname']>;
  logic: FormControl<IContestfield['logic']>;
  fopconstraint: FormControl<IContestfield['fopconstraint']>;
  fvalue: FormControl<IContestfield['fvalue']>;
  sopconstraint: FormControl<IContestfield['sopconstraint']>;
  svalue: FormControl<IContestfield['svalue']>;
  contest: FormControl<IContestfield['contest']>;
};

export type ContestfieldFormGroup = FormGroup<ContestfieldFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContestfieldFormService {
  createContestfieldFormGroup(contestfield: ContestfieldFormGroupInput = { id: null }): ContestfieldFormGroup {
    const contestfieldRawValue = {
      ...this.getFormDefaults(),
      ...contestfield,
    };
    return new FormGroup<ContestfieldFormGroupContent>({
      id: new FormControl(
        { value: contestfieldRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      mandatory: new FormControl(contestfieldRawValue.mandatory),
      reference: new FormControl(contestfieldRawValue.reference, {
        validators: [Validators.required],
      }),
      ctype: new FormControl(contestfieldRawValue.ctype, {
        validators: [Validators.required],
      }),
      cname: new FormControl(contestfieldRawValue.cname, {
        validators: [Validators.required],
      }),
      logic: new FormControl(contestfieldRawValue.logic, {
        validators: [Validators.required],
      }),
      fopconstraint: new FormControl(contestfieldRawValue.fopconstraint, {
        validators: [Validators.required],
      }),
      fvalue: new FormControl(contestfieldRawValue.fvalue, {
        validators: [Validators.required],
      }),
      sopconstraint: new FormControl(contestfieldRawValue.sopconstraint),
      svalue: new FormControl(contestfieldRawValue.svalue),
      contest: new FormControl(contestfieldRawValue.contest, {
        validators: [Validators.required],
      }),
    });
  }

  getContestfield(form: ContestfieldFormGroup): IContestfield | NewContestfield {
    return form.getRawValue() as IContestfield | NewContestfield;
  }

  resetForm(form: ContestfieldFormGroup, contestfield: ContestfieldFormGroupInput): void {
    const contestfieldRawValue = { ...this.getFormDefaults(), ...contestfield };
    form.reset(
      {
        ...contestfieldRawValue,
        id: { value: contestfieldRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContestfieldFormDefaults {
    return {
      id: null,
      mandatory: false,
    };
  }
}
