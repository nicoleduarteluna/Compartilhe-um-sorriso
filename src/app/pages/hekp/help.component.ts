import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/util/notification.service';
import { HelpService } from './help.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit {

  anonimato: string;
  mensagem: any;
  mensagens;

  constructor(private notificationService: NotificationService, private helpService: HelpService) {}

  ngOnInit() {
    this.mensagens = JSON.parse(sessionStorage.getItem("Mensagens"));
  }

  sendMessage() {
    if(this.mensagem != '') {
        this.mensagens.push({
            anonimato: this.anonimato,
            texto: this.mensagem
        });

        let form = {
          nome: sessionStorage.getItem('Nome'),
          dataNascimento: sessionStorage.getItem('DataNascimento'),
          identidadeGenero: sessionStorage.getItem('IdentidadeGenero'),
          telefone: sessionStorage.getItem('Telefone'),
          usuario:  sessionStorage.getItem('User'),
          senha: sessionStorage.getItem('Password'),
          mensagens: this.mensagens
        };
    
        this.helpService
          .createMessage(`http://localhost:9000/api/usuarios/${sessionStorage.getItem('E-mail').toLocaleLowerCase()}`, form)
          .subscribe({
            next: (data: any) => {
              this.notificationService.success('Mensagem enviada com sucesso!');
            },
            error: (err) => {
              this.notificationService.error('Não foi possível enviar a mensagem!');
            },
          });          
    } else {
        this.notificationService.warning('Preencha o campo de mensagem!');
    }
  }

 
}
