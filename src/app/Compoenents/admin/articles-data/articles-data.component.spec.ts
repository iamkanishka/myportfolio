import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesDataComponent } from './articles-data.component';

describe('ArticlesDataComponent', () => {
  let component: ArticlesDataComponent;
  let fixture: ComponentFixture<ArticlesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticlesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
