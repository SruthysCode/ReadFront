import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenteditprofileComponent } from './studenteditprofile.component';

describe('StudenteditprofileComponent', () => {
  let component: StudenteditprofileComponent;
  let fixture: ComponentFixture<StudenteditprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudenteditprofileComponent]
    });
    fixture = TestBed.createComponent(StudenteditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
