import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelinputComponent } from './telinput.component';

describe('TelinputComponent', () => {
  let component: TelinputComponent;
  let fixture: ComponentFixture<TelinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelinputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
