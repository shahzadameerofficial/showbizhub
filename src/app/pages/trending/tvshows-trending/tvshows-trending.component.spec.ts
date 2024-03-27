import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowsTrendingComponent } from './tvshows-trending.component';

describe('TvshowsTrendingComponent', () => {
  let component: TvshowsTrendingComponent;
  let fixture: ComponentFixture<TvshowsTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvshowsTrendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvshowsTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
