import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentactivityComponent } from './studentactivity.component';

describe('StudentactivityComponent', () => {
  let component: StudentactivityComponent;
  let fixture: ComponentFixture<StudentactivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentactivityComponent]
    });
    fixture = TestBed.createComponent(StudentactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
