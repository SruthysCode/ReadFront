import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorprofileComponent } from './mentorprofile.component';

describe('MentorprofileComponent', () => {
  let component: MentorprofileComponent;
  let fixture: ComponentFixture<MentorprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorprofileComponent]
    });
    fixture = TestBed.createComponent(MentorprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
