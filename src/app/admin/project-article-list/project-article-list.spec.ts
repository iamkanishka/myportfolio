import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectArticleList } from './project-article-list';

describe('ProjectArticleList', () => {
  let component: ProjectArticleList;
  let fixture: ComponentFixture<ProjectArticleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectArticleList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectArticleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
