import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlesSubtitlesComponent } from './titles-subtitles.component';

describe('TitlesSubtitlesComponent', () => {
  let component: TitlesSubtitlesComponent;
  let fixture: ComponentFixture<TitlesSubtitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitlesSubtitlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitlesSubtitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
