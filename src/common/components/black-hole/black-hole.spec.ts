import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlackHoleComponent } from './black-hole';

 

describe('BlackHole', () => {
  let component: BlackHoleComponent;
  let fixture: ComponentFixture<BlackHoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackHoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackHoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
