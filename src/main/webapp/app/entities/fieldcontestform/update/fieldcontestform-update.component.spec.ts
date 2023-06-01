import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FieldcontestformFormService } from './fieldcontestform-form.service';
import { FieldcontestformService } from '../service/fieldcontestform.service';
import { IFieldcontestform } from '../fieldcontestform.model';
import { IContestform } from 'app/entities/contestform/contestform.model';
import { ContestformService } from 'app/entities/contestform/service/contestform.service';

import { FieldcontestformUpdateComponent } from './fieldcontestform-update.component';

describe('Fieldcontestform Management Update Component', () => {
  let comp: FieldcontestformUpdateComponent;
  let fixture: ComponentFixture<FieldcontestformUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fieldcontestformFormService: FieldcontestformFormService;
  let fieldcontestformService: FieldcontestformService;
  let contestformService: ContestformService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FieldcontestformUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FieldcontestformUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldcontestformUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fieldcontestformFormService = TestBed.inject(FieldcontestformFormService);
    fieldcontestformService = TestBed.inject(FieldcontestformService);
    contestformService = TestBed.inject(ContestformService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Contestform query and add missing value', () => {
      const fieldcontestform: IFieldcontestform = { id: 'CBA' };
      const contestform: IContestform = { id: '8997fecb-8be9-48ff-96dd-5422786a3108' };
      fieldcontestform.contestform = contestform;

      const contestformCollection: IContestform[] = [{ id: '8b014f54-adf8-4f4a-9147-02e1ac86b311' }];
      jest.spyOn(contestformService, 'query').mockReturnValue(of(new HttpResponse({ body: contestformCollection })));
      const additionalContestforms = [contestform];
      const expectedCollection: IContestform[] = [...additionalContestforms, ...contestformCollection];
      jest.spyOn(contestformService, 'addContestformToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fieldcontestform });
      comp.ngOnInit();

      expect(contestformService.query).toHaveBeenCalled();
      expect(contestformService.addContestformToCollectionIfMissing).toHaveBeenCalledWith(
        contestformCollection,
        ...additionalContestforms.map(expect.objectContaining)
      );
      expect(comp.contestformsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fieldcontestform: IFieldcontestform = { id: 'CBA' };
      const contestform: IContestform = { id: 'b43b7bf2-656b-45c7-af15-059c1139fd66' };
      fieldcontestform.contestform = contestform;

      activatedRoute.data = of({ fieldcontestform });
      comp.ngOnInit();

      expect(comp.contestformsSharedCollection).toContain(contestform);
      expect(comp.fieldcontestform).toEqual(fieldcontestform);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldcontestform>>();
      const fieldcontestform = { id: 'ABC' };
      jest.spyOn(fieldcontestformFormService, 'getFieldcontestform').mockReturnValue(fieldcontestform);
      jest.spyOn(fieldcontestformService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldcontestform });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldcontestform }));
      saveSubject.complete();

      // THEN
      expect(fieldcontestformFormService.getFieldcontestform).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fieldcontestformService.update).toHaveBeenCalledWith(expect.objectContaining(fieldcontestform));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldcontestform>>();
      const fieldcontestform = { id: 'ABC' };
      jest.spyOn(fieldcontestformFormService, 'getFieldcontestform').mockReturnValue({ id: null });
      jest.spyOn(fieldcontestformService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldcontestform: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fieldcontestform }));
      saveSubject.complete();

      // THEN
      expect(fieldcontestformFormService.getFieldcontestform).toHaveBeenCalled();
      expect(fieldcontestformService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFieldcontestform>>();
      const fieldcontestform = { id: 'ABC' };
      jest.spyOn(fieldcontestformService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fieldcontestform });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fieldcontestformService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareContestform', () => {
      it('Should forward to contestformService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(contestformService, 'compareContestform');
        comp.compareContestform(entity, entity2);
        expect(contestformService.compareContestform).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
