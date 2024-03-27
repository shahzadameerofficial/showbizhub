import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleRatingComponent } from './circle-rating.component';

describe('CircleRatingComponent', () => {
  let component: CircleRatingComponent;
  let fixture: ComponentFixture<CircleRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CircleRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
