import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBar} from '../shared/nav-bar/nav-bar';
import {MenuBar} from '../shared/menu-bar/menu-bar';
import {LoaderComponent} from "../shared/loader/loader.component";
import {LoaderService} from "../../../core/services/loader/loader-service";

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    NavBar,
    MenuBar,
    LoaderComponent
  ],
  templateUrl: './main.html',
  styleUrl: './main.css',
  standalone: true
})
export class Main {

  isLoading: boolean = false;

  constructor(private readonly loaderService: LoaderService){
  }

  ngOnInit() {
    this.loaderService.getSpinnerState().subscribe(state => {
      if (state) {
        this.isLoading = true;
      }else{
        this.isLoading = false;
      }
    });
  }


}
