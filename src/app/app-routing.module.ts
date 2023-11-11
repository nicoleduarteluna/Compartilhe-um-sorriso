import { DadosComponent } from './pages/dados/dados.component';
import { LoginComponent } from './login/login.component';
import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { NovoCadastroComponent } from './pages/novo-cadastro/novo-cadastro.component';
import { FacComponent } from './pages/fac/fac.component';
import { HelpComponent } from './pages/hekp/help.component';
import { TextToHelpComponent } from './pages/textToHelp/text-to-help.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'fac', component: FacComponent, canActivate:[AuthGuard] },
  { path: 'dados', component: DadosComponent, canActivate:[AuthGuard] },
  { path: 'help', component: HelpComponent, canActivate:[AuthGuard] },
  { path: 'text-to-help', component: TextToHelpComponent, canActivate:[AuthGuard] },
  { path: 'novo-cadastro', component: NovoCadastroComponent, canActivate:[AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
