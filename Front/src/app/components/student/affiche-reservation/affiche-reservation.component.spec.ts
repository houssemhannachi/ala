import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheReservationComponent } from './affiche-reservation.component';

describe('AfficheReservationComponent', () => {
  let component: AfficheReservationComponent;
  let fixture: ComponentFixture<AfficheReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficheReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficheReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
