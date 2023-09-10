import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfinalComponent } from './dialogfinal.component';

describe('DialogfinalComponent', () => {
  let component: DialogfinalComponent;
  let fixture: ComponentFixture<DialogfinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogfinalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogfinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
