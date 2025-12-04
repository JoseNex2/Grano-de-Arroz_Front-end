import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCard } from './sales-card';

describe('SalesCard', () => {
  let component: SalesCard;
  let fixture: ComponentFixture<SalesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
