import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorconnectComponent } from './mentorconnect.component';

describe('MentorconnectComponent', () => {
  let component: MentorconnectComponent;
  let fixture: ComponentFixture<MentorconnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorconnectComponent]
    });
    fixture = TestBed.createComponent(MentorconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
