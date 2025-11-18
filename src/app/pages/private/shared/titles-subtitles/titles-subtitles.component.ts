import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-titles-subtitles',
  imports: [],
  templateUrl: './titles-subtitles.component.html',
  styleUrl: './titles-subtitles.component.css',
  standalone: true,
})
export class TitlesSubtitlesComponent {

  @Input() title: string = '';
  @Input() subtitle: string = '';

}
