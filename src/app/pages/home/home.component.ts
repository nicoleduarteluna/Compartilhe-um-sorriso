import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoMenuItem,
  PoSelectOption,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { NotificationService } from 'src/app/util/notification.service';
import { DadosService } from '../dados/dados.service';
import { HomeService } from './home.service';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  menuItemSelected: string = 'Home';
  usuarioLogado: any;
  labelConteudo: string = 'Conteúdo';
  filtro: string = 'nome';
  usuarios = [];

  filtroOptions: Array<PoSelectOption> = [
    { label: 'Nome do Paciente', value: 'nome' },
    { label: 'Data de Nascimento', value: 'dataNascimento' },
    { label: 'CPF do Paciente', value: 'cpf' },
    { label: 'Nome do Exame', value: 'nomeExame' },
    { label: 'Data do Exame', value: 'dataExecucao' },
  ];

  conteudoFiltro: string = '';

  columnsExame: PoTableColumn[] = [
    { label: 'Status', property: 'statusLaudo' },
    { label: 'Exame', property: 'nomeExame', width: '18%' },
    { label: 'Dt. Exame', property: 'dataExecucao' },
    { label: 'Nome', property: 'nome', width: '15%' },
    { label: 'Dt. Nascimento', property: 'dataNascimento' },
    { label: 'CPF Paciente', property: 'cpf' },
  ];

  exames: any[] = [];
  beneficiarios: any[] = [];

  rowSelected: any;

  user: string = '';

  constructor(
    private router: Router,
    private homeService: HomeService,
    private dadosService: DadosService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    const nav = this.router.getCurrentNavigation().extras.state;
    this.usuarios = nav.usuarios;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {}

  getUsers() {
    this.homeService.getUsers(this.user).subscribe((users: any) => {
      this.usuarioLogado = users.usuarios;
    });
  }

  redirectToDados() {
    this.router.navigate(['/dados']);
  }

  redirectToAjuda() {
    this.router.navigate(['/help']);
  }

  redirectToText() {
    this.router.navigate(['text-to-help'], { state: { usuarios: this.usuarios } });
  }

}
