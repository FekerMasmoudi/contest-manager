import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailinputComponent } from './emailinput.component';

describe('EmailinputComponent', () => {
  let component: EmailinputComponent;
  let fixture: ComponentFixture<EmailinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailinputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
