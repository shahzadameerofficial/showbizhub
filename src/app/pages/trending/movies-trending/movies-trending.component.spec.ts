import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTrendingComponent } from './movies-trending.component';

describe('MoviesTrendingComponent', () => {
  let component: MoviesTrendingComponent;
  let fixture: ComponentFixture<MoviesTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesTrendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
