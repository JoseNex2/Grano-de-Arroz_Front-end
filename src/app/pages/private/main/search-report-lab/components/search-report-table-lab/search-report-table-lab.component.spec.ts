import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportTableLabComponent } from './search-report-table-lab.component';

describe('SearchReportTableLabComponent', () => {
  let component: SearchReportTableLabComponent;
  let fixture: ComponentFixture<SearchReportTableLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchReportTableLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchReportTableLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
