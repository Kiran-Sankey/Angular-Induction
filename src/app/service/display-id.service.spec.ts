import { TestBed } from '@angular/core/testing';

import { DisplayIdService } from './display-id.service';

describe('DisplayIdService', () => {
  let service: DisplayIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
