import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBedgeComponent } from './custom-bedge.component';

describe('CustomBedgeComponent', () => {
  let component: CustomBedgeComponent;
  let fixture: ComponentFixture<CustomBedgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBedgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomBedgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
