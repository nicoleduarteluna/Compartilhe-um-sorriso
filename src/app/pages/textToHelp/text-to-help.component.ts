import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/util/notification.service';
import { TextToHelpService } from './text-to-help.service';
import { AuthService } from 'src/app/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-to-help',
  templateUrl: './text-to-help.component.html',
  styleUrls: ['./text-to-help.component.css'],
})
export class TextToHelpComponent implements OnInit {

  mensagens = [];
  exibeWidgets = true;
  textToHelp = "";
  mensagem = "";
  enviadoPor = "";
  idMensagem = "";
  anonimato;
 
  constructor(private notificationService: NotificationService, 
              private textToHelpService: TextToHelpService,
              private router: Router) 
    {
        const nav = this.router.getCurrentNavigation().extras.state;
        nav.usuarios.forEach(usuario => {
            if(usuario.usuario.toLocaleLowerCase() != sessionStorage.getItem('E-mail').toLocaleLowerCase()) {
                usuario.mensagens.forEach((mensagem) => {
                    this.mensagens.push({texto: mensagem.texto, user: mensagem.anonimato ? "Anônimo": usuario.nome, id: usuario._id
                });
                });
            }
        })    
    }

  ngOnInit() { }

  showToHelp(msg) {
    this.exibeWidgets = false;
    this.mensagem  = msg.texto;
    this.enviadoPor = msg.user;
    this.idMensagem= msg.id;
  }

  sendTextToHelp() {
    if(this.textToHelp != '') {
        let form = {
          mensagem: this.mensagem,
          enviadoPor: this.enviadoPor,
          idMensagem: this.idMensagem,
          resposta: { ajudante: this.anonimato ? "Anônimo" : sessionStorage.getItem('Nome').split(' ')[0], texto: this.textToHelp}
        };   
        this.textToHelpService.sendText(`http://localhost:4000/api/respostas`, form)
          .subscribe({
            next: (data: any) => {
              this.notificationService.success('Mensagem enviada com sucesso!');
            },
            error: (err) => {
              this.notificationService.error('Não foi possível enviar a mensagem!');
            },
          });          
    } else {
        this.notificationService.warning('Preencha o campo de mensagem para prosseguir!');
    }
  }
}
