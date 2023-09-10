import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoverviewComponent } from './dialogoverview.component';

describe('DialogoverviewComponent', () => {
  let component: DialogoverviewComponent;
  let fixture: ComponentFixture<DialogoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
