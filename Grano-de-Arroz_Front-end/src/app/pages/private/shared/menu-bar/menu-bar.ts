import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface MenuButton {
  label: string;
  icon: string;
  action: () => void;
}

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './menu-bar.html',
})
export class MenuBar {   // 👈 ahora la clase se llama MenuBar
  userRole: 'Administrador' | 'Gestor' | 'Sucursal' = 'Administrador';

  menuButtons: MenuButton[] = [];

  constructor() {
    this.loadMenu();
  }

  loadMenu() {
    if (this.userRole === 'Administrador') {
      this.menuButtons = [
        { label: 'Home', icon: 'pi pi-home', action: () => console.log('Home') },
        { label: 'Registros históricos', icon: 'pi pi-book', action: () => console.log('Registros') },
        { label: 'Gestión de usuarios', icon: 'pi pi-users', action: () => console.log('Usuarios') },
        { label: 'Métricas generales', icon: 'pi pi-chart-bar', action: () => console.log('Métricas') }
      ];
    }

    if (this.userRole === 'Gestor') {
      this.menuButtons = [
        { label: 'Home', icon: 'pi pi-home', action: () => console.log('Home') },
        { label: 'Registros históricos', icon: 'pi pi-book', action: () => console.log('Registros') },
        { label: 'Analizar batería', icon: 'pi pi-bolt', action: () => console.log('Batería') },
        { label: 'Métricas generales', icon: 'pi pi-chart-bar', action: () => console.log('Métricas') }
      ];
    }

    if (this.userRole === 'Sucursal') {
      this.menuButtons = [
        { label: 'Home', icon: 'pi pi-home', action: () => console.log('Home') },
        { label: 'Registros históricos', icon: 'pi pi-book', action: () => console.log('Registros') },
        { label: 'Registro de clientes', icon: 'pi pi-id-card', action: () => console.log('Clientes') }
      ];
    }
  }
}
