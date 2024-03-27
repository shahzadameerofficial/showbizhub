import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvFiltersComponent } from './tv-filters.component';

describe('TvFiltersComponent', () => {
  let component: TvFiltersComponent;
  let fixture: ComponentFixture<TvFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
