import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonBadgeComponent } from './season-badge.component';

describe('SeasonBadgeComponent', () => {
  let component: SeasonBadgeComponent;
  let fixture: ComponentFixture<SeasonBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
