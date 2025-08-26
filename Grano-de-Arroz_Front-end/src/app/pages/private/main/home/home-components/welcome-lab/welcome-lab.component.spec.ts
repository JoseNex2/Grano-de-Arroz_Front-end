import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLabComponent } from './welcome-lab.component';

describe('WelcomeLabComponent', () => {
  let component: WelcomeLabComponent;
  let fixture: ComponentFixture<WelcomeLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
