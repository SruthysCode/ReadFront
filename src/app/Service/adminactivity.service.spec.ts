import { TestBed } from '@angular/core/testing';

import { AdminactivityService } from './adminactivity.service';

describe('AdminactivityService', () => {
  let service: AdminactivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminactivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
