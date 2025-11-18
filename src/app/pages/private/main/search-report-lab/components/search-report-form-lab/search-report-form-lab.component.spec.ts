import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportFormLabComponent } from './search-report-form-lab.component';

describe('SearchReportFormLabComponent', () => {
  let component: SearchReportFormLabComponent;
  let fixture: ComponentFixture<SearchReportFormLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchReportFormLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchReportFormLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
