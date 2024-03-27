import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTitlesComponent } from './top-titles.component';

describe('TopTitlesComponent', () => {
  let component: TopTitlesComponent;
  let fixture: ComponentFixture<TopTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTitlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
