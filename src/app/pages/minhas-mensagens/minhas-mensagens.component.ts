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

   getRespostas() {
    let retorno;
    let index;
    this.minhasMensagensService.getMessages().subscribe((data: any) => {
       retorno = data.respostas;
       console.log('retorno', retorno)
       retorno.forEach(rsp => {
          this.mensagens.map(m => {
            if(m._id == rsp.idMensagem) {
              if(!m.respostas) {
                m.respostas = [];
              }
              m.respostas.push(rsp.resposta[0]);
            }
          });
          // index = this.mensagens.findIndex((msg) => msg._id = rsp.idMensagem);
          // if(index > -1) {
          //   if(!this.mensagens[index]['respostas']) {
          //     this.mensagens[index]['respostas'] = [];
          //   }
          //   this.mensagens[index]['respostas'].push(rsp.resposta[0]);
          //   console.log('this.mensagens', this.mensagens[index])
          // }
       });
    });
   }

   getUsers() {
    this.minhasMensagensService.getUsers().subscribe((users: any) => {
      users.usuarios.forEach(i => {
        if(i.usuario == sessionStorage.getItem('E-mail')) {
          this.mensagens = i.mensagens;
          console.log("this.mensagens", this.mensagens)
          if(this.mensagens.length > 0) {
            this.getRespostas();
          }
        }
      });
     });
   }
}
