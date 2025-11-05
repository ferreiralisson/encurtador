import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  shortenUrl(url: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/shorten`, url, {
      responseType: 'text' 
    });
  }
}
