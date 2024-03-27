import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritiesTrendingComponent } from './celebrities-trending.component';

describe('CelebritiesTrendingComponent', () => {
  let component: CelebritiesTrendingComponent;
  let fixture: ComponentFixture<CelebritiesTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelebritiesTrendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CelebritiesTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
