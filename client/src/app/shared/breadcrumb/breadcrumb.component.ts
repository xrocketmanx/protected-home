import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbItem } from './breadcrumb-item.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items: BreadcrumbItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
