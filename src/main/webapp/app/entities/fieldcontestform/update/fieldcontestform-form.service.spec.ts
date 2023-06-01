import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fieldcontestform.test-samples';

import { FieldcontestformFormService } from './fieldcontestform-form.service';

describe('Fieldcontestform Form Service', () => {
  let service: FieldcontestformFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldcontestformFormService);
  });

  describe('Service methods', () => {
    describe('createFieldcontestformFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFieldcontestformFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fname: expect.any(Object),
            ftype: expect.any(Object),
            fvalue: expect.any(Object),
            frank: expect.any(Object),
            fsize: expect.any(Object),
            contestform: expect.any(Object),
          })
        );
      });

      it('passing IFieldcontestform should create a new form with FormGroup', () => {
        const formGroup = service.createFieldcontestformFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fname: expect.any(Object),
            ftype: expect.any(Object),
            fvalue: expect.any(Object),
            frank: expect.any(Object),
            fsize: expect.any(Object),
            contestform: expect.any(Object),
          })
        );
      });
    });

    describe('getFieldcontestform', () => {
      it('should return NewFieldcontestform for default Fieldcontestform initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFieldcontestformFormGroup(sampleWithNewData);

        const fieldcontestform = service.getFieldcontestform(formGroup) as any;

        expect(fieldcontestform).toMatchObject(sampleWithNewData);
      });

      it('should return NewFieldcontestform for empty Fieldcontestform initial value', () => {
        const formGroup = service.createFieldcontestformFormGroup();

        const fieldcontestform = service.getFieldcontestform(formGroup) as any;

        expect(fieldcontestform).toMatchObject({});
      });

      it('should return IFieldcontestform', () => {
        const formGroup = service.createFieldcontestformFormGroup(sampleWithRequiredData);

        const fieldcontestform = service.getFieldcontestform(formGroup) as any;

        expect(fieldcontestform).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFieldcontestform should not enable id FormControl', () => {
        const formGroup = service.createFieldcontestformFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFieldcontestform should disable id FormControl', () => {
        const formGroup = service.createFieldcontestformFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
