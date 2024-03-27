import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowSearchComponent } from './tvshow-search.component';

describe('TvshowSearchComponent', () => {
  let component: TvshowSearchComponent;
  let fixture: ComponentFixture<TvshowSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvshowSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvshowSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
