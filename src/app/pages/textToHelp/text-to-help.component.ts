import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/util/notification.service';
import { TextToHelpService } from './text-to-help.service';
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
  loading = false;
 
  constructor(private notificationService: NotificationService, 
              private textToHelpService: TextToHelpService,
              private router: Router) 
    {
        const nav = this.router.getCurrentNavigation().extras.state;
        nav.usuarios.forEach(usuario => {
            if(usuario.usuario.toLocaleLowerCase() != sessionStorage.getItem('E-mail').toLocaleLowerCase()) {
                usuario.mensagens.forEach((mensagem) => {
                    this.mensagens.push({texto: mensagem.texto, user: usuario.nome, id: mensagem._id, anonimato: mensagem.anonimato
                });
              });
              this.loading = true;
            }
        })    
    }

  ngOnInit() { 
    this.getMessages();
  }

  //Método que seta exibeWidgets como false para o componente mudar o que está sendo exibido na tela (*ngIf).
  //Nesse momento será exibida a mensagem que será respondida, juntamente com a caixa de texto para envio da mensagem de ajuda, botão de envio e 
  //a opção de anonimato.
  showToHelp(msg) {
    this.exibeWidgets = false;
    this.mensagem  = msg.texto;
    this.enviadoPor = msg.anonimato ? "Anônimo" : msg.user.split(' ')[0];
    this.idMensagem= msg.id;
  }

  //Método que cadastra a mensagem enviada no banco de dados, através de um POST na API de respostas e depois exibe uma notificação de sucesso ou erro.
  sendTextToHelp() {
    if(this.textToHelp != '') {
        this.loading = true;
        let form = {
          mensagem: this.mensagem,
          enviadoPor: this.enviadoPor,
          idMensagem: this.idMensagem,
          resposta: { ajudante: sessionStorage.getItem('E-mail'), texto: this.textToHelp, anonimato: this.anonimato ? true : false}
        };   
        this.textToHelpService.sendText(`http://localhost:4000/api/respostas`, form)
          .subscribe({
            next: (data: any) => {
              this.notificationService.success('Mensagem enviada com sucesso!');
              this.getMessages();  
              this.exibeWidgets = true;
            },
            error: (err) => {
              this.loading = false;
              this.getMessages();  
              this.notificationService.error('Não foi possível enviar a mensagem!');
            },
          });          
    } else {
        this.notificationService.warning('Preencha o campo de mensagem para prosseguir!');
    }
  }

  //Busca todas as mensagens disponíveis para serem respondidas e exibe somente as que ainda não foram respondidas pelo usuário logado.
  getMessages() {
    let indice;
    this.textToHelpService.getMessages().subscribe((mensagens: any) => {
        this.mensagens.forEach(msg => {
          mensagens.respostas.forEach(rsp => {
            if(msg.id == rsp.idMensagem) {
              indice = rsp.resposta.findIndex(i => i.ajudante == sessionStorage.getItem('E-mail'));
              if(indice > -1) {
                this.mensagens.splice(indice, 1);
              }
            }
          });
        });
        this.loading = false;
      });
   }

}
