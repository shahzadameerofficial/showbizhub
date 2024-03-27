import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteCardComponent } from './auto-complete-card.component';

describe('AutoCompleteCardComponent', () => {
  let component: AutoCompleteCardComponent;
  let fixture: ComponentFixture<AutoCompleteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCompleteCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoCompleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
