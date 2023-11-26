import { DadosModule } from './pages/dados/dados.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule, PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { HomeModule } from './pages/home/home.module';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { HttpClientModule } from '@angular/common/http';
import { NovoCadastroModule } from './pages/novo-cadastro/novo-cadastro.module';
import { FaqModule } from './pages/faq/faq.module';
import { HelpModule } from './pages/help/help.module';
import { TextToHelpModule } from './pages/textToHelp/text-to-help.module';
import { AppRoutingModule } from './app-routing.module';
import { MinhasMensagensComponent } from './pages/minhas-mensagens/minhas-mensagens.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MinhasMensagensComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    LoginModule,
    HomeModule,
    PoPageDynamicSearchModule,
    PoCodeEditorModule,
    HttpClientModule,
    DadosModule,
    NovoCadastroModule,
    HomeModule,
    FaqModule,
    HelpModule,
    TextToHelpModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
