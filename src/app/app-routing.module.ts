import { DadosComponent } from './pages/dados/dados.component';
import { LoginComponent } from './login/login.component';
import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { NovoCadastroComponent } from './pages/novo-cadastro/novo-cadastro.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HelpComponent } from './pages/help/help.component';
import { TextToHelpComponent } from './pages/textToHelp/text-to-help.component';
import { MinhasMensagensComponent } from './pages/minhas-mensagens/minhas-mensagens.component';

//Controla todas as rotas disponíveis e quais componentes cada um chamará
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'faq', component: FaqComponent, canActivate:[AuthGuard] },
  { path: 'dados', component: DadosComponent, canActivate:[AuthGuard] },
  { path: 'help', component: HelpComponent, canActivate:[AuthGuard] },
  { path: 'text-to-help', component: TextToHelpComponent, canActivate:[AuthGuard] },
  { path: 'my-messages', component: MinhasMensagensComponent, canActivate:[AuthGuard] },
  { path: 'novo-cadastro', component: NovoCadastroComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
