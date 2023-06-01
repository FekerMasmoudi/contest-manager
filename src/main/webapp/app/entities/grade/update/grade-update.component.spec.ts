import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GradeFormService } from './grade-form.service';
import { GradeService } from '../service/grade.service';
import { IGrade } from '../grade.model';
import { ICertificate } from 'app/entities/certificate/certificate.model';
import { CertificateService } from 'app/entities/certificate/service/certificate.service';
import { IEducationlevel } from 'app/entities/educationlevel/educationlevel.model';
import { EducationlevelService } from 'app/entities/educationlevel/service/educationlevel.service';

import { GradeUpdateComponent } from './grade-update.component';

describe('Grade Management Update Component', () => {
  let comp: GradeUpdateComponent;
  let fixture: ComponentFixture<GradeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let gradeFormService: GradeFormService;
  let gradeService: GradeService;
  let certificateService: CertificateService;
  let educationlevelService: EducationlevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GradeUpdateComponent],
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
      .overrideTemplate(GradeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GradeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    gradeFormService = TestBed.inject(GradeFormService);
    gradeService = TestBed.inject(GradeService);
    certificateService = TestBed.inject(CertificateService);
    educationlevelService = TestBed.inject(EducationlevelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Certificate query and add missing value', () => {
      const grade: IGrade = { id: 'CBA' };
      const certificate: ICertificate = { id: '36963884-540e-4517-a5be-f4598d759c18' };
      grade.certificate = certificate;

      const certificateCollection: ICertificate[] = [{ id: 'f998f37b-bd19-40f2-b1bd-1ef23d8e6f61' }];
      jest.spyOn(certificateService, 'query').mockReturnValue(of(new HttpResponse({ body: certificateCollection })));
      const additionalCertificates = [certificate];
      const expectedCollection: ICertificate[] = [...additionalCertificates, ...certificateCollection];
      jest.spyOn(certificateService, 'addCertificateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(certificateService.query).toHaveBeenCalled();
      expect(certificateService.addCertificateToCollectionIfMissing).toHaveBeenCalledWith(
        certificateCollection,
        ...additionalCertificates.map(expect.objectContaining)
      );
      expect(comp.certificatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Educationlevel query and add missing value', () => {
      const grade: IGrade = { id: 'CBA' };
      const educationlevel: IEducationlevel = { id: 'ab167cf1-a8b2-4681-8913-670899322655' };
      grade.educationlevel = educationlevel;

      const educationlevelCollection: IEducationlevel[] = [{ id: '151ee086-1390-4b3e-b109-c0cbfaa0697b' }];
      jest.spyOn(educationlevelService, 'query').mockReturnValue(of(new HttpResponse({ body: educationlevelCollection })));
      const additionalEducationlevels = [educationlevel];
      const expectedCollection: IEducationlevel[] = [...additionalEducationlevels, ...educationlevelCollection];
      jest.spyOn(educationlevelService, 'addEducationlevelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(educationlevelService.query).toHaveBeenCalled();
      expect(educationlevelService.addEducationlevelToCollectionIfMissing).toHaveBeenCalledWith(
        educationlevelCollection,
        ...additionalEducationlevels.map(expect.objectContaining)
      );
      expect(comp.educationlevelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const grade: IGrade = { id: 'CBA' };
      const certificate: ICertificate = { id: '1bd91762-0fc5-4063-b08b-3265b79932b7' };
      grade.certificate = certificate;
      const educationlevel: IEducationlevel = { id: 'b6b00730-85f3-4739-ae52-c56e40e0e180' };
      grade.educationlevel = educationlevel;

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(comp.certificatesSharedCollection).toContain(certificate);
      expect(comp.educationlevelsSharedCollection).toContain(educationlevel);
      expect(comp.grade).toEqual(grade);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 'ABC' };
      jest.spyOn(gradeFormService, 'getGrade').mockReturnValue(grade);
      jest.spyOn(gradeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grade }));
      saveSubject.complete();

      // THEN
      expect(gradeFormService.getGrade).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(gradeService.update).toHaveBeenCalledWith(expect.objectContaining(grade));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 'ABC' };
      jest.spyOn(gradeFormService, 'getGrade').mockReturnValue({ id: null });
      jest.spyOn(gradeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grade }));
      saveSubject.complete();

      // THEN
      expect(gradeFormService.getGrade).toHaveBeenCalled();
      expect(gradeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 'ABC' };
      jest.spyOn(gradeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(gradeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCertificate', () => {
      it('Should forward to certificateService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(certificateService, 'compareCertificate');
        comp.compareCertificate(entity, entity2);
        expect(certificateService.compareCertificate).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEducationlevel', () => {
      it('Should forward to educationlevelService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(educationlevelService, 'compareEducationlevel');
        comp.compareEducationlevel(entity, entity2);
        expect(educationlevelService.compareEducationlevel).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
