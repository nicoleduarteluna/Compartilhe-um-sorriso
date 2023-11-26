import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './login/auth.service';
import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { AuthGuard } from './core/auth/auth.guard';
import { PoMenuItem, PoModalAction, PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

  mostraMenu: boolean = false;
  menuItemSelected: string;
  usuarioLogado: any;
  usuarios = [];
   
  menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      action: this.updateMenu.bind(this),
      icon: 'po-icon po-icon-home',
      shortLabel: 'Home',
      link: '/home'
    },
    {
      label: 'Meus Dados',
      action: this.updateMenu.bind(this),
      icon: 'po-icon po-icon-archive',
      shortLabel: 'Dados',
      link: '/dados'
    },
    {
      label: 'Minhas Mensagens',
      action: this.updateMenu.bind(this),
      icon: 'po-icon po-icon-message',
      shortLabel: 'Mensagens',
      link: '/my-messages'
    },
    {
      label: 'FAQ',
      action: this.updateMenu.bind(this),
      icon: 'po-icon po-icon-news',
      shortLabel: 'FAQ',
      link: '/faq'
    },
    {
      label: 'Sair',
      action: this.openModalExit.bind(this),
      icon: 'po-icon po-icon-exit',
      shortLabel: 'Sair'
    },
  ];

  updateMenus = [];
  menuNovoCadastro = [
    {
      label: 'Home',
      action: this.updateMenu.bind(this),
      icon: 'po-icon po-icon-home',
      shortLabel: 'Home',
      link: '/login'
    },
  ];

  @ViewChild('modalExit') modalExit: PoModalComponent;

  primaryAction: PoModalAction = {
    action: () => {
      this.redirectLogin();
      this.modalExit.close();
      this.mostraMenu = false;
    },
    label: 'Confirmar'
  };

  constructor( private authService: AuthService,
    private authGuard: AuthGuard,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(){
    this.authGuard.mostraMenuEmit.subscribe(mostra => {
      this.mostraMenu = mostra
    });

    this.authService.usuarioLogadoEmitter.subscribe(usuario => {
      this.usuarioLogado = usuario;
    });

    this.updateMenus = this.menus;
  }

  ngAfterViewChecked(): void {
    const rotaAtiva = this.activatedRoute.snapshot.children[0].routeConfig.path;
    if (rotaAtiva == 'login' ) {
      this.mostraMenu = false;
    } else if (rotaAtiva == 'novo-cadastro'){
      this.mostraMenu = true;
      this.updateMenus = this.menuNovoCadastro;
    } else {
      this.updateMenus = this.menus;
    }
  }

  updateMenu(menu: PoMenuItem) {
    this.usuarios = this.authService.getUsuarios();
    this.menuItemSelected = menu.label;
    this.router.navigate([menu.link], { state: { menu: this.menuItemSelected, usuario: this.usuarioLogado, usuarios: this.usuarios } })
  }

  openModalExit() {
    this.modalExit.open();
  }

  redirectLogin() {
    this.router.navigate(['/']);
  }

}
