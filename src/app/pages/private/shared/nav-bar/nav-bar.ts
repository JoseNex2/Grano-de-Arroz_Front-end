import {Component, OnInit} from '@angular/core';
import {Menu} from 'primeng/menu';
import {Button} from 'primeng/button';
import {AuthService} from '../../../../core/services/auth/authService';

@Component({
  selector: 'app-nav-bar',
  imports: [
    Menu,
    Button
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar implements OnInit{

  constructor(private authService: AuthService) {
  }

  items: any;
  user = JSON.parse(localStorage.getItem('meUser')|| '{}');

  ngOnInit() {
  this.items= [
    {label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => {this.authService.logout();}}
  ]
  }

}
