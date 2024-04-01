import { TestBed } from '@angular/core/testing';

import { StudentactivityService } from './studentactivity.service';

describe('StudentactivityService', () => {
  let service: StudentactivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentactivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
