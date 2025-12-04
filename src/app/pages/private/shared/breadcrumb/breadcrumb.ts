import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';
import {Router} from '@angular/router';
import { BreadcrumbItem } from '../../../../core/interfaces/breadcrumbitem';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    Breadcrumb
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
  standalone: true
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: MenuItem[] = [];
  @Input() breadcrumbItems: BreadcrumbItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.breadcrumbItems.length > 0) {
      this.items = this.createNavigableItems(this.breadcrumbItems);
    }
  }

  private createNavigableItems(routes: BreadcrumbItem[]): MenuItem[] {
    return routes.map((item, index) => {
      const isLastItem = index === routes.length - 1;
      
      return {
        label: item.label,
        routerLink: item.route && !isLastItem ? item.route : undefined,
        command: item.route && !isLastItem ? () => this.router.navigate([item.route]) : undefined,
        disabled: !item.route || isLastItem,
        styleClass: isLastItem ? 'current-page' : ''
      };
    });
  }
}
