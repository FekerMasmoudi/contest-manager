import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestformdraggableComponent } from './contestformdraggable.component';

describe('ContestformdraggableComponent', () => {
  let component: ContestformdraggableComponent;
  let fixture: ComponentFixture<ContestformdraggableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContestformdraggableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContestformdraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
