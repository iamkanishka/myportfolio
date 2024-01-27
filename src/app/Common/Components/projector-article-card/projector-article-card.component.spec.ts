import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectorArticleCardComponent } from './projector-article-card.component';

describe('ProjectorArticleCardComponent', () => {
  let component: ProjectorArticleCardComponent;
  let fixture: ComponentFixture<ProjectorArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectorArticleCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectorArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
