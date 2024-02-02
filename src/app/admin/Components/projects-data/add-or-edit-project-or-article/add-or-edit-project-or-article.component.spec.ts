import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditProjectOrArticleComponent } from './add-or-edit-project-or-article.component';

describe('AddOrEditProjectOrArticleComponent', () => {
  let component: AddOrEditProjectOrArticleComponent;
  let fixture: ComponentFixture<AddOrEditProjectOrArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditProjectOrArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditProjectOrArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
