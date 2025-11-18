import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportFormComponent } from './search-report-form.component';

describe('SearchReportFormLabComponent', () => {
  let component: SearchReportFormComponent;
  let fixture: ComponentFixture<SearchReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchReportFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
