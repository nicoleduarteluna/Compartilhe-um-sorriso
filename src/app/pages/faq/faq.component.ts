import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/util/notification.service';
import { FaqService } from './faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  menuItemSelected: string = '';

  constructor(private router: Router, private facService: FaqService, private notificationService: NotificationService) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.menuItemSelected = nav.menu;
  }

  ngOnInit() {  }

 
}
