import { Component } from '@angular/core';
import { WelcomeCardComponent } from "../../shared/welcome-card/welcome-card.component";
import { BatteryCardComponent } from "../../shared/battery-card/battery-card.component";

@Component({
  selector: 'app-home',
  imports: [WelcomeCardComponent, BatteryCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {

}
