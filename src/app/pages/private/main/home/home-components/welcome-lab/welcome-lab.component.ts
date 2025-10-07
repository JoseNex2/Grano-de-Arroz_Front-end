import { Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TitlesSubtitlesComponent } from '../../../../shared/titles-subtitles/titles-subtitles.component';
import { EvaluationStatusChartsComponent } from "../evaluation-status-charts/evaluation-status-charts.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-lab',
  imports: [ButtonModule, TitlesSubtitlesComponent],
  templateUrl: './welcome-lab.component.html',
  standalone: true,
})
export class WelcomeLabComponent {

  constructor(private router: Router) {
  }

  goTo(route: string) {
    this.router.navigate(['inicio/analizar-bateria']);
  }

}
