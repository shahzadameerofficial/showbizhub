import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrendingComponent } from './all-trending.component';

describe('AllTrendingComponent', () => {
  let component: AllTrendingComponent;
  let fixture: ComponentFixture<AllTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTrendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
