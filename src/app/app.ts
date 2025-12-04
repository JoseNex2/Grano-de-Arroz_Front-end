import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('Grano-de-Arroz_Front-end');

  constructor(private messageService: MessageService) {
  }

  testToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Test',
      detail: 'Toast funcionando correctamente!'
    });
  }

}
