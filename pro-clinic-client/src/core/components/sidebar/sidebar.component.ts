import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isMenuOpened = false;

  constructor() { }

  ngOnInit(): void {
  }

}
