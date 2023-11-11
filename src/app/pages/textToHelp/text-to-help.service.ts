import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToHelpService {

  constructor(private http: HttpClient) { }

  sendText(url, usuario: any) {
    let headers = new HttpHeaders();

    headers = headers.append("X-PO-No-Error", "true");

    return this.http
      .post(url, usuario, {
        headers,
      });
  }

}
