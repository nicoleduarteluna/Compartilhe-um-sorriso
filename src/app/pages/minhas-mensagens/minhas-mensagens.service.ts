import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MinhasMensagensService {

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get("http://localhost:4000/api/respostas");
  }

  getUsers() {
    return this.http.get("http://localhost:9000/api/usuarios");
  }

}
