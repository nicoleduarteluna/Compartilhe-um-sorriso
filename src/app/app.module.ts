import { DadosModule } from './pages/dados/dados.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
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
import { NovoCadastroComponent } from './pages/novo-cadastro/novo-cadastro.component';
import { NovoCadastroModule } from './pages/novo-cadastro/novo-cadastro.module';
import { FacModule } from './pages/fac/fac.module';
import { HelpModule } from './pages/hekp/help.module';
import { TextToHelpModule } from './pages/textToHelp/text-to-help.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    FacModule,
    HelpModule,
    TextToHelpModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
