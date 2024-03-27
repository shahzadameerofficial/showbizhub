import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLineComponent } from './details-line.component';

describe('DetailsLineComponent', () => {
  let component: DetailsLineComponent;
  let fixture: ComponentFixture<DetailsLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
