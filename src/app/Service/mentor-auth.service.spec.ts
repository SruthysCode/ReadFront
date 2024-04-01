import { TestBed } from '@angular/core/testing';

import { MentorAuthService } from './mentor-auth.service';

describe('MentorAuthService', () => {
  let service: MentorAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
