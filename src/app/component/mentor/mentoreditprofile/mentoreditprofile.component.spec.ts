import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoreditprofileComponent } from './mentoreditprofile.component';

describe('MentoreditprofileComponent', () => {
  let component: MentoreditprofileComponent;
  let fixture: ComponentFixture<MentoreditprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentoreditprofileComponent]
    });
    fixture = TestBed.createComponent(MentoreditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
