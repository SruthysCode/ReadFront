import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentchatComponent } from './studentchat.component';

describe('StudentchatComponent', () => {
  let component: StudentchatComponent;
  let fixture: ComponentFixture<StudentchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentchatComponent]
    });
    fixture = TestBed.createComponent(StudentchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
