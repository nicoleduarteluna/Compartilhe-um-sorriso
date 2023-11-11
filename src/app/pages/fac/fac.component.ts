import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';
import { FacService } from './fac.service';

@Component({
  selector: 'app-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.css'],
})
export class FacComponent implements OnInit {
  menuItemSelected: string = '';

  constructor(private router: Router, private facService: FacService, private notificationService: NotificationService) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.menuItemSelected = nav.menu;
  }

  ngOnInit() {  }

 
}
