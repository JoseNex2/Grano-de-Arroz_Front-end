import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ClientService } from '../../../../../../core/services/clients/client-service';
import { ApiResponse } from '../../../../../../core/interfaces/api-response';
import { ClientInterface } from '../../../../../../core/interfaces/clientinterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-card',
  imports: [],
  templateUrl: './sales-card.html',
  styleUrl: './sales-card.css',
  standalone: true
})

export class SalesCard implements OnInit, OnDestroy {
  clientsTotal: number = 0;
  private destroy$ = new Subject<void>();
  totalClients = 0 ;

  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.getTotalCustomers()
  }

  getTotalCustomers() {
    this.clientService.getClients().subscribe({
      next: (res) => {
        if (res.code == 200) {
          this.totalClients = res.response.clients.length;
        }
      },
      error: (err) => {
        console.error("Error al obtener clientes:", err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  goToRegister() {
    this.router.navigate(['/inicio/clientes/registro-de-clientes']);
  }
}
