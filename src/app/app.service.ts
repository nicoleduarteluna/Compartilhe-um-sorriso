import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  isLogged() {
    return !!(sessionStorage.getItem('User')); //Retorna se est�o logado.
  }

}
