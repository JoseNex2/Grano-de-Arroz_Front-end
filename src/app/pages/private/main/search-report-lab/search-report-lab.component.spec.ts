import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportLabComponent } from './search-report-lab.component';

describe('SearchReportLabComponent', () => {
  let component: SearchReportLabComponent;
  let fixture: ComponentFixture<SearchReportLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchReportLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchReportLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
