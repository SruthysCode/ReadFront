import { TestBed } from '@angular/core/testing';

import { MentoractivityService } from './mentoractivity.service';

describe('MentoractivityService', () => {
  let service: MentoractivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentoractivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
