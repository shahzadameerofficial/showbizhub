import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebrityComponent } from './celebrity.component';

describe('CelebrityComponent', () => {
  let component: CelebrityComponent;
  let fixture: ComponentFixture<CelebrityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelebrityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CelebrityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
