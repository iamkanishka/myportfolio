import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorEditProjectComponent } from './addor-edit-project.component';

describe('AddorEditProjectComponent', () => {
  let component: AddorEditProjectComponent;
  let fixture: ComponentFixture<AddorEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddorEditProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddorEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
