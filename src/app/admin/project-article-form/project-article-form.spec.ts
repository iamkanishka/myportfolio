import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectArticleForm } from './project-article-form';

describe('ProjectArticleForm', () => {
  let component: ProjectArticleForm;
  let fixture: ComponentFixture<ProjectArticleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectArticleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectArticleForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
