import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorhomeComponent } from './mentorhome.component';

describe('MentorhomeComponent', () => {
  let component: MentorhomeComponent;
  let fixture: ComponentFixture<MentorhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorhomeComponent]
    });
    fixture = TestBed.createComponent(MentorhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
