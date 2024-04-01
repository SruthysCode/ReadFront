import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentvideoComponent } from './studentvideo.component';

describe('StudentvideoComponent', () => {
  let component: StudentvideoComponent;
  let fixture: ComponentFixture<StudentvideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentvideoComponent]
    });
    fixture = TestBed.createComponent(StudentvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
