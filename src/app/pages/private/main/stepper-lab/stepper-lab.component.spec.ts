import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperLabComponent } from './stepper-lab.component';

describe('StepperLabComponent', () => {
  let component: StepperLabComponent;
  let fixture: ComponentFixture<StepperLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
