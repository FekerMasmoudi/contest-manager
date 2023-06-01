import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FieldcontestformDetailComponent } from './fieldcontestform-detail.component';

describe('Fieldcontestform Management Detail Component', () => {
  let comp: FieldcontestformDetailComponent;
  let fixture: ComponentFixture<FieldcontestformDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldcontestformDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ fieldcontestform: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(FieldcontestformDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FieldcontestformDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load fieldcontestform on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.fieldcontestform).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
