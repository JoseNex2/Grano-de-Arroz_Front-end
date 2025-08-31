import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationStatusChartsComponent } from './evaluation-status-charts.component';

describe('EvaluationStatusChartsComponent', () => {
  let component: EvaluationStatusChartsComponent;
  let fixture: ComponentFixture<EvaluationStatusChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationStatusChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationStatusChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
