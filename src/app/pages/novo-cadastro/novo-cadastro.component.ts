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

  users = [];

  constructor(
    private novoCadatroService: NovoCadastroService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

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
    } else if (this.isEmailExist) {
      this.notificationService.error('Já existe uma conta vinculada a este e-mail!');
    } else  {
      if(!this.validarMaiorIdade()) {
        this.notificationService.warning(
          'Notamos que você é menor de idade, queremos alertar que determinadas informações sensíveis podem ser encontradas na plataforma!', 10000
        );
      }
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
          this.notificationService.success('Usuário inserido no banco');
        },
        error: (err) => {
          this.notificationService.success('Erro ao inserir usuário no banco');
        },
      });
  }

  validarMaiorIdade() {
    const dia = Number(this.dataNascimento.substring(0, 2));
    const mes = Number(this.dataNascimento.substring(2, 4));
    const ano = Number(this.dataNascimento.substring(4, 8));
    const dataNascimento = new Date(ano, mes - 1, dia);
    const diferencaMilissegundos = new Date().getTime() - dataNascimento.getTime();
    const diferencaAnos = Math.floor(diferencaMilissegundos / (365.25 * 24 * 60 * 60 * 1000));
    const diferencaMeses = Math.floor(diferencaMilissegundos / (30.44 * 24 * 60 * 60 * 1000));
    const diferencaDias = Math.floor(diferencaMilissegundos / (24 * 60 * 60 * 1000));
    const idadeMinima = 18;
    if (diferencaAnos > idadeMinima || (diferencaAnos === idadeMinima && diferencaMeses >= 0 && diferencaDias >= 0)) {
      return true;
    } else {
      return false;
    }
  }

  getUsers() {
    this.novoCadatroService.getUsers().subscribe((users: any) => {
      users.usuarios.forEach((user) => {
        this.users.push(user);
      });
      console.log('this.users', this.users)
    });
  }

  isEmailExist(email: string): boolean {
    return this.users.some(user => user.usuario === email);
  }

}
