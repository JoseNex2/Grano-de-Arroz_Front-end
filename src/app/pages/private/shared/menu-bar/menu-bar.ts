import { Component } from '@angular/core';
import {Router} from "@angular/router";

interface MenuButton {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [],
  templateUrl: './menu-bar.html',
})
export class MenuBar {

  userRole = JSON.parse(localStorage.getItem('rol') || '{}');

  menuButtons: MenuButton[] = [];

  constructor(private router: Router) {
    this.loadMenu();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  loadMenu() {
    if (this.userRole === 'Administrador') {
      this.menuButtons = [
        { label: 'Home', icon: 'pi pi-home', route: '/inicio' },
        { label: 'Registros históricos', icon: 'pi pi-book', route: '/inicio/registros-historicos'},
        { label: 'Gestión de usuarios', icon: 'pi pi-users', route: '/inicio/usuarios'},
        { label: 'Métricas generales', icon: 'pi pi-chart-bar', route: '/inicio' }
      ];
    }

    if (this.userRole === 'Laboratorio') {
      this.menuButtons = [
        { label: 'Home', icon: 'pi pi-home', route: '/inicio'},
        { label: 'Analizar batería', icon: 'pi pi-bolt', route: '/inicio/reportes/buscar'},
        { label: 'Registros históricos', icon: 'pi pi-book', route: '/inicio/registros-historicos'},
        { label: 'Métricas generales', icon: 'pi pi-chart-bar', route: '/inicio/metricas-generales'}
      ];
    }

    if (this.userRole === 'Sucursal') {
      this.menuButtons = [
        { label: 'Home', icon: 'pi pi-home', route: '/inicio'},
        { label: 'Registros históricos', icon: 'pi pi-book', route: '/inicio/registros-historicos'},
        { label: 'Registro de clientes', icon: 'pi pi-id-card', route: '/inicio/clientes' },
        { label: 'Generar Reporte', icon: 'pi pi-file-arrow-up', route: '/inicio/reportes/generar'},
      ];
    }
  }
}
