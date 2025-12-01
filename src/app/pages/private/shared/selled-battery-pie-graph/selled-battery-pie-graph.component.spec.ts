import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelledBatteryPieGraphComponent } from './selled-battery-pie-graph.component';

describe('SelledBatteryPieGraphComponent', () => {
  let component: SelledBatteryPieGraphComponent;
  let fixture: ComponentFixture<SelledBatteryPieGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelledBatteryPieGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelledBatteryPieGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
