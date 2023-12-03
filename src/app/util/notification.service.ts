import { Injectable } from '@angular/core';
import { PoToasterOrientation } from '@po-ui/ng-components';
import { PoNotification } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private poNotification: PoNotification = {
    message: '',
    orientation: PoToasterOrientation.Bottom,
  };

  constructor(private poNotificationService: PoNotificationService) { }

  //Classe responsável por definir as configurações das notificações e seus tipos.
  
  information(msg: string) {
    this.poNotification.message = msg;
    this.poNotification.duration = 3000;
    this.poNotificationService.information(this.poNotification);
  }

  success(msg: string) {
    this.poNotification.message = msg;
    this.poNotification.duration = 3000;
    this.poNotificationService.success(this.poNotification);
  }

  warning(msg: string, duration = 3000) {
    this.poNotification.message = msg;
    this.poNotification.duration = duration;
    this.poNotificationService.warning(this.poNotification);
  }

  error(msg: string) {
    this.poNotification.message = msg;
    this.poNotificationService.error(this.poNotification);
  }

}
