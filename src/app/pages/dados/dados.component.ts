import { DadosService } from './dados.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css'],
})
export class DadosComponent implements OnInit {
  menuItemSelected: string = '';
  nomeCompleto: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  identidadeGenero: string;
  senha: string;

  @ViewChild('modalUpdate') modalUpdate: PoModalComponent;

  primaryAction: PoModalAction = {
    action: () => {
      this.alterarDados();
      this.modalUpdate.close();
    },
    label: 'Confirmar',
  };

  secondaryAction: PoModalAction = {
    action: () => {
      this.modalUpdate.close();
    },
    label: 'Cancelar',
  };

  constructor(private router: Router, private dadosService: DadosService, private notificationService: NotificationService) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.menuItemSelected = nav.menu;
  }

  ngOnInit() {
    this.senha = sessionStorage.getItem('Password');
    this.nomeCompleto = sessionStorage.getItem('Nome');
    this.dataNascimento = sessionStorage.getItem('DataNascimento');
    this.identidadeGenero = sessionStorage.getItem('IdentidadeGenero');
    this.email = sessionStorage.getItem('E-mail').toLocaleLowerCase();
    this.telefone = sessionStorage.getItem('Telefone');
  }

  openModal() {
    this.modalUpdate.open();
  }

  alterarDados() {
   this.updateStorage();
   let userForm = {
      nome: this.nomeCompleto,
      dataNascimento: this.dataNascimento,
      identidadeGenero: this.identidadeGenero,
      telefone: this.telefone,
      usuario: this.email,
      senha: this.senha
    };

    this.dadosService
      .atualizarBeneficiario(userForm)
      .subscribe((res) => {
        this.notificationService.success('Dados alterados com sucesso!');
      });
  }

  updateStorage() {
    sessionStorage.setItem('User', this.email);
    sessionStorage.setItem('Password', this.senha);
    sessionStorage.setItem('Nome', this.nomeCompleto);
    sessionStorage.setItem('E-mail', this.email);
    sessionStorage.setItem('DataNascimento', this.dataNascimento);
    sessionStorage.setItem('IdentidadeGenero', this.identidadeGenero);
    sessionStorage.setItem('Telefone', this.telefone);
  }
}
