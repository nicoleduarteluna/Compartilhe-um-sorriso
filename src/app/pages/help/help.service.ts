import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private http: HttpClient) { }

  createMessage(url, usuario: any) {
    let headers = new HttpHeaders();

    headers = headers.append("X-PO-No-Error", "true");

    return this.http
      .put(url, usuario, {
        headers,
      });
  }

}
