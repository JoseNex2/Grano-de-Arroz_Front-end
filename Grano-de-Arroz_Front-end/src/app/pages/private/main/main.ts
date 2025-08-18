import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBar} from '../shared/nav-bar/nav-bar';
import {MenuBar} from '../shared/menu-bar/menu-bar';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    NavBar,
    MenuBar
  ],
  templateUrl: './main.html',
  styleUrl: './main.css',
  standalone: true
})
export class Main {

  constructor() {
  }

}
