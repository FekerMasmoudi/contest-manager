import { TestBed } from '@angular/core/testing';

import { ContestformdraggableService } from './contestformdraggable.service';

describe('ContestformdraggableService', () => {
  let service: ContestformdraggableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestformdraggableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
