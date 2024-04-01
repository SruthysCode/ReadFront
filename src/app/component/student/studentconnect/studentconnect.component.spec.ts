import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentconnectComponent } from './studentconnect.component';

describe('StudentconnectComponent', () => {
  let component: StudentconnectComponent;
  let fixture: ComponentFixture<StudentconnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentconnectComponent]
    });
    fixture = TestBed.createComponent(StudentconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
