import { TestBed } from '@angular/core/testing';

import { SessionsServiceService } from './sessions-service.service';

describe('SessionsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionsServiceService = TestBed.get(SessionsServiceService);
    expect(service).toBeTruthy();
  });
});
