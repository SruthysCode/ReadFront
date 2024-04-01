import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentblogComponent } from './studentblog.component';

describe('StudentblogComponent', () => {
  let component: StudentblogComponent;
  let fixture: ComponentFixture<StudentblogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentblogComponent]
    });
    fixture = TestBed.createComponent(StudentblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
