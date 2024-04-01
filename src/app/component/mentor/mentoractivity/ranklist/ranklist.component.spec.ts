import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RanklistComponent } from './ranklist.component';

describe('RanklistComponent', () => {
  let component: RanklistComponent;
  let fixture: ComponentFixture<RanklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RanklistComponent]
    });
    fixture = TestBed.createComponent(RanklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
