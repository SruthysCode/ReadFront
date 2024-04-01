import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorblogComponent } from './mentorblog.component';

describe('MentorblogComponent', () => {
  let component: MentorblogComponent;
  let fixture: ComponentFixture<MentorblogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorblogComponent]
    });
    fixture = TestBed.createComponent(MentorblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
