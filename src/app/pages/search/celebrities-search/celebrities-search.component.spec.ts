import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritiesSearchComponent } from './celebrities-search.component';

describe('CelebritiesSearchComponent', () => {
  let component: CelebritiesSearchComponent;
  let fixture: ComponentFixture<CelebritiesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelebritiesSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CelebritiesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
