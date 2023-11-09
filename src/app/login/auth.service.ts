import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../util/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mostraMenuEmitter = new EventEmitter<boolean>();
  usuarioLogadoEmitter = new EventEmitter();

  usuarioAutenticado: boolean = false;

  constructor(private router: Router, private notificationService: NotificationService) { }

  checkLogin(event, users){
    console.log('event', event)
    console.log('users', users)
    users.forEach((user, index) => {
      if (event.login.toUpperCase() == user.usuario.toUpperCase() && event.password == user.senha ) {
        this.usuarioAutenticado = true;
        this.mostraMenuEmitter.emit(true);
        this.usuarioLogadoEmitter.emit(user);
        sessionStorage.setItem('User', event.login.toUpperCase());
        sessionStorage.setItem('Password', event.password);
        sessionStorage.setItem('Nome', user.nome.toUpperCase());
        sessionStorage.setItem('E-mail', user.usuario);
        sessionStorage.setItem('DataNascimento', user.dataNascimento);
        sessionStorage.setItem('IdentidadeGenero', user.identidadeGenero);
        sessionStorage.setItem('Telefone', user.telefone);
        this.router.navigate(['home'], { state: { usuarioLogado: user } });
      } else {
        if (index == (users.length -1) && !this.usuarioAutenticado) {
          this.notificationService.warning('Usuário não autorizado!');
          this.mostraMenuEmitter.emit(false);
        }
      }
    });
  }

}
