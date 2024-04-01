import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorchatComponent } from './mentorchat.component';

describe('MentorchatComponent', () => {
  let component: MentorchatComponent;
  let fixture: ComponentFixture<MentorchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorchatComponent]
    });
    fixture = TestBed.createComponent(MentorchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
