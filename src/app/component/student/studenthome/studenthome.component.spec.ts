import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenthomeComponent } from './studenthome.component';

describe('StudenthomeComponent', () => {
  let component: StudenthomeComponent;
  let fixture: ComponentFixture<StudenthomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudenthomeComponent]
    });
    fixture = TestBed.createComponent(StudenthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
