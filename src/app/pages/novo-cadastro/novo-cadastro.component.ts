import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/util/notification.service';
import { NovoCadastroService } from './novo-cadastro.service';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css'],
})
export class NovoCadastroComponent implements OnInit {
  menuItemSelected: string = 'Cadastro de Usuários';

  nomeCompleto: string = '';
  dataNascimento: string = '';
  email: string = '';
  telefone: string = '';
  identidadeGenero: string = '';

  senhaUsuario: string = '';

  profissionalForm = {};
  beneficiarioForm = {};
  userForm = {};

  constructor(
    private novoCadatroService: NovoCadastroService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    // const nav = this.router.getCurrentNavigation().extras.state;
    // this.menuItemSelected = nav.menu;
  }

  ngOnInit(): void {}

  updateForm(event) {
      this.novoCadatroService.setUrl('http://localhost:4000/api/beneficiarios');
  }

  postInfo() {
    if (
      !this.nomeCompleto ||
      !this.dataNascimento ||
      !this.identidadeGenero ||
      !this.telefone ||
      !this.email
    ) {
      this.notificationService.warning(
        'É necessário preencher todos os campos!'
      );
    } else {
      this.createUsuario();
      this.router.navigate(['/login']);
    }
  }

  createUsuario() {
    this.userForm = {
      nome: this.nomeCompleto,
      dataNascimento: this.dataNascimento,
      identidadeGenero: this.identidadeGenero,
      telefone: this.telefone,
      usuario: this.email,
      senha: this.senhaUsuario
    };

    this.novoCadatroService
      .createUsuario('http://localhost:9000/api/usuarios', this.userForm)
      .subscribe({
        next: (data: any) => {
          console.log('Usuário inserido no banco');
        },
        error: (err) => {
          console.log('Erro ao inserir usuário no banco');
        },
      });
  }
}
