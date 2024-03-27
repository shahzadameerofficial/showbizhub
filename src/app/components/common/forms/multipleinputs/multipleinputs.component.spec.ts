import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleinputsComponent } from './multipleinputs.component';

describe('MultipleinputsComponent', () => {
  let component: MultipleinputsComponent;
  let fixture: ComponentFixture<MultipleinputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleinputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleinputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
