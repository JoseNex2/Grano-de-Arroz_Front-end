import { Component } from '@angular/core';
import {TitlesSubtitlesComponent} from "../../shared/titles-subtitles/titles-subtitles.component";
import {Step, StepList, StepPanel, StepPanels, Stepper} from "primeng/stepper";
import {Button} from "primeng/button";

@Component({
  selector: 'analizar-bateria',
  imports: [
    TitlesSubtitlesComponent,
    Stepper,
    StepList,
    StepPanels,
    StepPanel,
    Step,
    Button
  ],
  templateUrl: './stepper-lab.component.html',
  styleUrl: './stepper-lab.component.css'
})
export class StepperLabComponent {

}
