import {Component, Input} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    Breadcrumb
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
  standalone: true
})
export class BreadcrumbComponent {
  @Input() items: MenuItem[] = [];
}
