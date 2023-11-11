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
  usuarios = [];

  constructor(private router: Router, private notificationService: NotificationService) { }

  checkLogin(event, users){
    this.setUsuarios(users);
    users.forEach((user, index) => {
      if (event.login.toUpperCase() == user.usuario.toUpperCase() && event.password == user.senha ) {
        this.usuarioAutenticado = true;
        this.mostraMenuEmitter.emit(true);
        this.usuarioLogadoEmitter.emit(user);
        sessionStorage.setItem('User', event.login);
        sessionStorage.setItem('Password', event.password);
        sessionStorage.setItem('Nome', user.nome);
        sessionStorage.setItem('E-mail', user.usuario.toLocaleLowerCase());
        sessionStorage.setItem('DataNascimento', user.dataNascimento);
        sessionStorage.setItem('IdentidadeGenero', user.identidadeGenero);
        sessionStorage.setItem('Telefone', user.telefone);
        sessionStorage.setItem("Mensagens", JSON.stringify(user.mensagens));
        this.router.navigate(['home'], { state: { usuarioLogado: user, usuarios:  users } });
      } else {
        if (index == (users.length -1) && !this.usuarioAutenticado) {
          this.notificationService.warning('Usuário não autorizado!');
          this.mostraMenuEmitter.emit(false);
        }
      }
    });
  }

  setUsuarios(usuarios) {
    this.usuarios = usuarios;
  }

  getUsuarios() {
    return this.usuarios;
  }

}
