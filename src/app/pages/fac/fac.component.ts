import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';
import { FacService } from './fac.service';

@Component({
  selector: 'app-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.css'],
})
export class FacComponent implements OnInit {
  menuItemSelected: string = '';
  nomeCompleto: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;

  beneficiarioForm = {};

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

  constructor(private router: Router, private facService: FacService, private notificationService: NotificationService) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.facService.setId(nav.usuario.rg);
    this.menuItemSelected = nav.menu;
  }

  ngOnInit() {
    this.facService.getDadosBenef().subscribe((dadosBenef: any) => {
      this.nomeCompleto = dadosBenef.beneficiarios.nome;
      this.dataNascimento = dadosBenef.beneficiarios.dataNascimento;
      this.cpf = dadosBenef.beneficiarios.cpf;
      this.rg = dadosBenef.beneficiarios.rg;
      this.email = dadosBenef.beneficiarios.email;
      this.telefone = dadosBenef.beneficiarios.telefone;
    });
  }

  openModal() {
    this.modalUpdate.open();
  }

  alterarDados() {
    this.beneficiarioForm = {
      rg: this.facService.getId(),
      nome: this.nomeCompleto,
      dataNascimento: this.dataNascimento,
      cpf: this.cpf,
      email: this.email,
      telefone: this.telefone,
    };

    this.facService
      .atualizarBeneficiario(this.beneficiarioForm)
      .subscribe((res) => {
        this.notificationService.success('Dados alterados com sucesso!');
      });
  }
}
