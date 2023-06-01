import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFieldcontestform, NewFieldcontestform } from '../fieldcontestform.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFieldcontestform for edit and NewFieldcontestformFormGroupInput for create.
 */
type FieldcontestformFormGroupInput = IFieldcontestform | PartialWithRequiredKeyOf<NewFieldcontestform>;

type FieldcontestformFormDefaults = Pick<NewFieldcontestform, 'id'>;

type FieldcontestformFormGroupContent = {
  id: FormControl<IFieldcontestform['id'] | NewFieldcontestform['id']>;
  fname: FormControl<IFieldcontestform['fname']>;
  ftype: FormControl<IFieldcontestform['ftype']>;
  fvalue: FormControl<IFieldcontestform['fvalue']>;
  frank: FormControl<IFieldcontestform['frank']>;
  fsize: FormControl<IFieldcontestform['fsize']>;
  contestform: FormControl<IFieldcontestform['contestform']>;
};

export type FieldcontestformFormGroup = FormGroup<FieldcontestformFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FieldcontestformFormService {
  createFieldcontestformFormGroup(fieldcontestform: FieldcontestformFormGroupInput = { id: null }): FieldcontestformFormGroup {
    const fieldcontestformRawValue = {
      ...this.getFormDefaults(),
      ...fieldcontestform,
    };
    return new FormGroup<FieldcontestformFormGroupContent>({
      id: new FormControl(
        { value: fieldcontestformRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fname: new FormControl(fieldcontestformRawValue.fname, {
        validators: [Validators.required],
      }),
      ftype: new FormControl(fieldcontestformRawValue.ftype, {
        validators: [Validators.required],
      }),
      fvalue: new FormControl(fieldcontestformRawValue.fvalue),
      frank: new FormControl(fieldcontestformRawValue.frank),
      fsize: new FormControl(fieldcontestformRawValue.fsize),
      contestform: new FormControl(fieldcontestformRawValue.contestform, {
        validators: [Validators.required],
      }),
    });
  }

  getFieldcontestform(form: FieldcontestformFormGroup): IFieldcontestform | NewFieldcontestform {
    return form.getRawValue() as IFieldcontestform | NewFieldcontestform;
  }

  resetForm(form: FieldcontestformFormGroup, fieldcontestform: FieldcontestformFormGroupInput): void {
    const fieldcontestformRawValue = { ...this.getFormDefaults(), ...fieldcontestform };
    form.reset(
      {
        ...fieldcontestformRawValue,
        id: { value: fieldcontestformRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FieldcontestformFormDefaults {
    return {
      id: null,
    };
  }
}
