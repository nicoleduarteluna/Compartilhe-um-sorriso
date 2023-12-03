import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/util/notification.service';
import { MinhasMensagensService } from './minhas-mensagens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minhas-mensagens',
  templateUrl: './minhas-mensagens.component.html',
  styleUrls: ['./minhas-mensagens.component.css'],
})
export class MinhasMensagensComponent implements OnInit {

  mensagens = [];
  mensagensFiltered = [];
  users = [];
  menuItemSelected = "";

  constructor(private notificationService: NotificationService, 
              private router: Router,
              private minhasMensagensService: MinhasMensagensService) 
    {
      const nav = this.router.getCurrentNavigation().extras.state;
      this.menuItemSelected = nav.menu;
    }

  ngOnInit() {
    this.getUsers();
   }

   //Busca todas as respostas de mensagens. 
   //E filtra se é de alguma mensagem que o usuário logado enviou, para adicionar a resposta no array this.mensagens
   getRespostas() {
    let retorno;
    this.minhasMensagensService.getMessages().subscribe((data: any) => {
       retorno = data.respostas;
       retorno.forEach(rsp => {
          this.mensagens.map(m => {
            if(m._id == rsp.idMensagem) {
              if(!m.respostas) {
                m.respostas = [];
              }
              m.respostas.push(rsp.resposta[0]);
            }
          });
       });
    });
   }


   //Busca todas as mensagens e depois filtra para pegar somente as que foram enviadas pelo usuário logado.
   getUsers() {
    this.minhasMensagensService.getUsers().subscribe((users: any) => {
      users.usuarios.forEach(i => {
        if(i.usuario == sessionStorage.getItem('E-mail')) {
          this.mensagens = i.mensagens;
          if(this.mensagens.length > 0) {
            this.getRespostas();
          }
        }
      });
     });
   }
}
