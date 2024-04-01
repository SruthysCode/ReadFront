import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsidebarComponent } from './mentorsidebar.component';

describe('MentorsidebarComponent', () => {
  let component: MentorsidebarComponent;
  let fixture: ComponentFixture<MentorsidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorsidebarComponent]
    });
    fixture = TestBed.createComponent(MentorsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
