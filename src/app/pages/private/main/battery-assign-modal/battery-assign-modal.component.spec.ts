import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryAssignModalComponent } from './battery-assign-modal.component';

describe('BatteryAssignModalComponent', () => {
  let component: BatteryAssignModalComponent;
  let fixture: ComponentFixture<BatteryAssignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatteryAssignModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryAssignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
