import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCelebrityCardComponent } from './mini-celebrity-card.component';

describe('MiniCelebrityCardComponent', () => {
  let component: MiniCelebrityCardComponent;
  let fixture: ComponentFixture<MiniCelebrityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCelebrityCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniCelebrityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
