import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoractivityComponent } from './mentoractivity.component';

describe('MentoractivityComponent', () => {
  let component: MentoractivityComponent;
  let fixture: ComponentFixture<MentoractivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentoractivityComponent]
    });
    fixture = TestBed.createComponent(MentoractivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
