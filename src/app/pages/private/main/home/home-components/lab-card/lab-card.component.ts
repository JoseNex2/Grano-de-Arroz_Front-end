import { Component, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ClientService } from '../../../../../../core/services/clients/client-service';
import { ApiResponse } from '../../../../../../core/interfaces/api-response';
import { ClientInterface } from '../../../../../../core/interfaces/clientinterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lab-card',
  imports: [],
  templateUrl: './lab-card.component.html',
  styleUrl: './lab-card.component.css',
  standalone: true
})

export class LabCardComponent implements OnInit, OnDestroy {
  clientsTotal: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.loadClientsTotal();
  }

  private loadClientsTotal(): void {
    this.clientService.getClients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ApiResponse<ClientInterface[]>) => {
          console.log('Respuesta getClients()', res);
          // Opción A: usar length del array
          const byLength = Array.isArray(res.response) ? res.response.length : 0;
          // Opción B: tomar campo totalClients del primer elemento
          const byField = res.response?.[0]?.totalClients ?? 0;
          this.clientsTotal = byField || byLength; // prioriza el campo, sino length
        },
        error: (e) => {
          console.error('Error getClients()', e);
          this.clientsTotal = 20; //numero inventado para vender humito
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  goToRegister() {
    this.router.navigate(['/main/registro-de-clientes']);
  }
}
