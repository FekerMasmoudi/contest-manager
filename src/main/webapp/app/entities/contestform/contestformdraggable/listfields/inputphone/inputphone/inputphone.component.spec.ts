import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputphoneComponent } from './inputphone.component';

describe('InputphoneComponent', () => {
  let component: InputphoneComponent;
  let fixture: ComponentFixture<InputphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputphoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
