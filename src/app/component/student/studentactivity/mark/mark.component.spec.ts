import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkComponent } from './mark.component';

describe('MarkComponent', () => {
  let component: MarkComponent;
  let fixture: ComponentFixture<MarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkComponent]
    });
    fixture = TestBed.createComponent(MarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
