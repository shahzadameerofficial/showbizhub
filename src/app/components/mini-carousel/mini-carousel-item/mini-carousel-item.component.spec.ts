import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCarouselItemComponent } from './mini-carousel-item.component';

describe('MiniCarouselItemComponent', () => {
  let component: MiniCarouselItemComponent;
  let fixture: ComponentFixture<MiniCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCarouselItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
