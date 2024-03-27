import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebrityHeroSectionComponent } from './celebrity-hero-section.component';

describe('CelebrityHeroSectionComponent', () => {
  let component: CelebrityHeroSectionComponent;
  let fixture: ComponentFixture<CelebrityHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelebrityHeroSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CelebrityHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
