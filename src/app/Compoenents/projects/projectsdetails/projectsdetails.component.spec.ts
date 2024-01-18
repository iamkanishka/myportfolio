import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsdetailsComponent } from './projectsdetails.component';

describe('ProjectsdetailsComponent', () => {
  let component: ProjectsdetailsComponent;
  let fixture: ComponentFixture<ProjectsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
