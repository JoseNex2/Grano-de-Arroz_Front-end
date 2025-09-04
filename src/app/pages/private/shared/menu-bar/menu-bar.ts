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
  userRole: 'Administrador' | 'Gestor' | 'Sucursal' = 'Administrador';

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
        { label: 'Home', icon: 'pi pi-home', route: '/main' },
        { label: 'Registros históricos', icon: 'pi pi-book', route: '/main'},
        { label: 'Gestión de usuarios', icon: 'pi pi-users', route: '/main/usuarios'},
        { label: 'Métricas generales', icon: 'pi pi-chart-bar', route: '/main' }
      ];
    }

    if (this.userRole === 'Gestor') {
      this.menuButtons = [
        { label: 'Home', icon: 'pi pi-home', route: '/main'},
        { label: 'Registros históricos', icon: 'pi pi-book', route: '/main'},
        { label: 'Analizar batería', icon: 'pi pi-bolt', route: '/main'},
        { label: 'Métricas generales', icon: 'pi pi-chart-bar', route: '/main'}
      ];
    }

    if (this.userRole === 'Sucursal') {
      this.menuButtons = [
        { label: 'Home', icon: 'pi pi-home', route: '/main'},
        { label: 'Registros históricos', icon: 'pi pi-book', route: '/main'},
        { label: 'Registro de clientes', icon: 'pi pi-id-card', route: '/clientes' }
      ];
    }
  }
}
